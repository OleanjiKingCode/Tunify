// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Tunify is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter public noOfAllSongs;
    Counters.Counter public noOfAllRegisteredUsers;

    struct RegisteredUsers {
        uint userId;
        string userName;
        address userAddress;
        string userEmail;
        string dateRegistered;
        uint noOfUploadedSongs;
        uint noOfFollowers;
        // Songs in album are starred songs
        uint noOfSongsInAlbum;
    }

    struct Songs {
        uint songId;
        uint price;
        string songName;
        string songType;
        string genre;
        uint artisteId;
        address artisteAddress;
        string songFile;
        uint noOfLikes;
        // means number of people put the songs in their album
        uint noOfStars;
        string dateUploaded;
    }

    event userRegistered(
        uint userId,
        string userName,
        address userAddress,
        string userEmail,
        string dateRegistered,
        uint noOfUploadedSongs,
        uint noOfFollowers,
        uint noOfSongsInAlbum
    );

    event songUploaded(
        uint songId,
        uint price,
        string songName,
        string songType,
        string genre,
        uint artisteId,
        address artisteAddress,
        string songFile,
        uint noOfLikes,
        uint noOfStars,
        string dateUploaded,
        uint total
    );

    event songLiked(uint songId, uint userId, uint noOfLikes, string userEmail);

    event songAddedToAlbum(
        uint songId,
        uint userId,
        string userEmail,
        uint noOfStars
    );

    event followArtiste(uint artisteId, uint userId, uint followers);

    address _owner;
    mapping(uint => RegisteredUsers) private idUsers;
    mapping(address => bool) private alreadyAUser;
    mapping(address => mapping(uint => bool)) private DidyouStarSong;
    mapping(uint => mapping(uint => bool)) private eligibles;
    mapping(uint => mapping(uint => bool)) private whoDidYouFollow;
    mapping(address => mapping(uint => bool)) private DidyouLike;
    mapping(uint => Songs) private idSongs;

    // constructor() {

    // }

    function uploadSongs(
        uint _price,
        string memory _songName,
        string memory _songType,
        string memory _genre,
        uint _artisteId,
        string memory _songFile,
        string memory _date
    ) public {
        require(alreadyAUser[msg.sender] == true, "Users cant upload");
        noOfAllSongs.increment();
        uint total;
        uint _currentSongId = noOfAllSongs.current();

        idSongs[_currentSongId] = Songs(
            _currentSongId,
            _price,
            _songName,
            _songType,
            _genre,
            _artisteId,
            msg.sender,
            _songFile,
            0,
            0,
            _date
        );
        uint currentUsersNum = noOfAllRegisteredUsers.current();
        for (uint index = 0; index < currentUsersNum; index++) {
            if (msg.sender == idUsers[index + 1].userAddress) {
                total = idUsers[index + 1].noOfUploadedSongs += 1;
            }
        }
        emit songUploaded(
            _currentSongId,
            _price,
            _songName,
            _songType,
            _genre,
            _artisteId,
            msg.sender,
            _songFile,
            0,
            0,
            _date,
            total
        );
    }

    function registerUsers(
        string memory _name,
        address _address,
        string memory _email,
        string memory _date
    ) public nonReentrant {
        require(
            alreadyAUser[msg.sender] == false,
            "You are already a user of this dapp"
        );
        noOfAllRegisteredUsers.increment();
        uint _currentUserId = noOfAllRegisteredUsers.current();

        idUsers[_currentUserId] = RegisteredUsers(
            _currentUserId,
            _name,
            payable(_address),
            _email,
            _date,
            0,
            0,
            0
        );

        alreadyAUser[msg.sender] = true;

        emit userRegistered(
            _currentUserId,
            _name,
            _address,
            _email,
            _date,
            0,
            0,
            0
        );
    }

    function downloadSongs(uint _songId, uint _userId)
        public
        payable
        nonReentrant
    {
        uint price = idSongs[_songId].price;

        require(
            msg.value == price,
            "please submit the asking price in order to complete the download"
        );
        uint _artisteId;
        address _artisteAddress;

        _artisteId = idSongs[_songId].artisteId;
        _artisteAddress = idSongs[_songId].artisteAddress;

        payable(_artisteAddress).transfer(msg.value);
        eligibles[_songId][_userId] = true;
    }

    function fetchUsers() public view returns (RegisteredUsers[] memory) {
        uint currentUserNum = noOfAllRegisteredUsers.current();
        uint currentIndex = 0;
        RegisteredUsers[] memory members = new RegisteredUsers[](
            currentUserNum
        );
        for (uint256 index = 0; index < currentUserNum; index++) {
            uint currenNum = idUsers[index + 1].userId;
            RegisteredUsers storage memeMem = idUsers[currenNum];
            members[currentIndex] = memeMem;
            currentIndex += 1;
        }
        return members;
    }

    function fetchAllSongs() public view returns (Songs[] memory) {
        uint currentSongsNum = noOfAllSongs.current();

        uint currentIndex = currentSongsNum;
        Songs[] memory memes = new Songs[](currentSongsNum);

        for (uint256 index = 0; index < currentSongsNum; index++) {
            uint currenNum = idSongs[index + 1].songId;
            Songs storage memeFiles = idSongs[currenNum];

            memes[currentIndex - 1] = memeFiles;
            currentIndex -= 1;
        }
        return memes;
    }

    function followArtist(uint _songId, uint userId) public {
        uint currentUsersNum = noOfAllRegisteredUsers.current();
        address _artisteAddress;
        uint newFollowers;
        uint _artisteId = idSongs[_songId].artisteId;
        _artisteAddress = idSongs[_songId].artisteAddress;
        for (uint index = 0; index < currentUsersNum; index++) {
            if (_artisteAddress == idUsers[index + 1].userAddress) {
                newFollowers = idUsers[index + 1].noOfFollowers++;
            }
        }
        whoDidYouFollow[_artisteId][userId] = true;
        emit followArtiste(_artisteId, userId, newFollowers);
    }

    function likeSong(uint _songid) public {
        uint currentSongsNum = noOfAllSongs.current();
        uint currentUsersNum = noOfAllRegisteredUsers.current();

        uint _userId;
        uint256 newLikes;
        string memory _userEmail;

        if (DidyouLike[msg.sender][_songid] == true) {
            for (uint i = 0; i < currentSongsNum; i++) {
                if (_songid == idSongs[i + 1].songId) {
                    newLikes = idSongs[i + 1].noOfLikes;
                    newLikes -= 1;
                    idSongs[i + 1].noOfLikes = newLikes;
                    DidyouLike[msg.sender][_songid] = false;
                }
            }
        } else {
            for (uint i = 0; i < currentSongsNum; i++) {
                if (_songid == idSongs[i + 1].songId) {
                    newLikes = idSongs[i + 1].noOfLikes;
                    newLikes += 1;
                    idSongs[i + 1].noOfLikes = newLikes;
                    DidyouLike[msg.sender][_songid] = true;
                }
            }
        }

        for (uint index = 0; index < currentUsersNum; index++) {
            if (msg.sender == idUsers[index + 1].userAddress) {
                _userId = idUsers[index + 1].userId;
                _userEmail = idUsers[index + 1].userEmail;
            }
        }

        emit songLiked(_songid, _userId, newLikes, _userEmail);
    }

    function WhatDidILike(uint _songId, address sender)
        public
        view
        returns (bool)
    {
        bool youLiked = DidyouLike[sender][_songId];
        return youLiked;
    }

    function WhatDidIAddtoAlbum(uint _songId, address sender)
        public
        view
        returns (bool)
    {
        bool youstarred = DidyouStarSong[sender][_songId];
        return youstarred;
    }

    function StarSong(uint _songId) public {
        uint currentSongsNum = noOfAllSongs.current();
        uint currentUsersNum = noOfAllRegisteredUsers.current();

        uint _userId;
        uint256 newAlbumCount;
        string memory _userEmail;

        if (DidyouStarSong[msg.sender][_songId] == true) {
            for (uint i = 0; i < currentSongsNum; i++) {
                if (_songId == idSongs[i + 1].songId) {
                    newAlbumCount = idSongs[i + 1].noOfStars;
                    newAlbumCount -= 1;
                    idSongs[i + 1].noOfStars = newAlbumCount;
                    DidyouStarSong[msg.sender][_songId] = false;
                }
            }

            for (uint index = 0; index < currentUsersNum; index++) {
                if (msg.sender == idUsers[index + 1].userAddress) {
                    idUsers[index + 1].noOfSongsInAlbum--;
                }
            }
        } else {
            for (uint i = 0; i < currentSongsNum; i++) {
                if (_songId == idSongs[i + 1].songId) {
                    newAlbumCount = idSongs[i + 1].noOfStars;
                    newAlbumCount += 1;
                    idSongs[i + 1].noOfStars = newAlbumCount;
                    DidyouStarSong[msg.sender][_songId] = true;
                }
            }
            for (uint index = 0; index < currentUsersNum; index++) {
                if (msg.sender == idUsers[index + 1].userAddress) {
                    idUsers[index + 1].noOfSongsInAlbum++;
                }
            }
        }

        for (uint index = 0; index < currentUsersNum; index++) {
            if (msg.sender == idUsers[index + 1].userAddress) {
                _userId = idUsers[index + 1].userId;
                _userEmail = idUsers[index + 1].userEmail;
            }
        }

        emit songAddedToAlbum(_songId, _userId, _userEmail, newAlbumCount);
    }

    receive() external payable {}

    fallback() external payable {}
}
