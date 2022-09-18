import { BigInt } from "@graphprotocol/graph-ts"
import {
  Tunify,
  followArtiste,
  songAddedToAlbum,
  songLiked,
  songUploaded,
  userRegistered
} from "../generated/Tunify/Tunify"
import { Song, User } from "../generated/schema"

export function handlefollowArtiste(event: followArtiste): void {
  let entity = User.load(event.params.artisteId.toString())

  if(!entity) {
    return ;
  }

  entity.Followers = event.params.followers;

  let user = User.load(event.params.userId.toString());
  // You have to be a user to be able to like a meme
  if(!user){
    return;
  }

  let Thisaddress = user.Adddress;

  let addr = entity.FollowersAddresses;
  if(!addr){
    return;
  }
  addr.push(Thisaddress);
  entity.FollowersAddresses = addr;
 
  entity.save()
 
}

export function handlesongAddedToAlbum(event: songAddedToAlbum): void {
  let entity = Song.load(event.params.songId.toString())

  if(!entity) {
    return ;
  }

  entity.Stars = event.params.noOfStars;

  let user = User.load(event.params.userId.toString());
  // You have to be a user to be able to like a meme
  if(!user){
    return;
  }
  user.AlbumSongs = event.params.noOfStars;
  let Thisaddress = user.Adddress;

  let addr = entity.StarredAddresses
  if(!addr){
    return;
  }
  addr.push(Thisaddress);
  entity.LikesAddresses = addr;
 
  entity.save()
}

export function handlesongLiked(event: songLiked): void {
  let entity = Song.load(event.params.songId.toString())

  if(!entity) {
    return ;
  }

  entity.Likes = event.params.noOfLikes;
  let user = User.load(event.params.userId.toString());
  // You have to be a user to be able to like a meme
  if(!user){
    return;
  }

  let Thisaddress = user.Adddress;

  let addr = entity.LikesAddresses
  if(!addr){
    return;
  }
  addr.push(Thisaddress);
  entity.LikesAddresses = addr;
 
  entity.save()
}

export function handlesongUploaded(event: songUploaded): void {
  let entity = Song.load(event.params.songId.toString())

  if (!entity) {
    entity = new Song(event.params.songId.toString())
  }
  entity.Name = event.params.songName;
  entity.FileType= event.params.songType;
  entity.OwnerAddress = event.params.artisteAddress;
  entity.FileLink = event.params.songFile;
  entity.Date = event.params.dateUploaded;
  entity.Genre = event.params.genre;
  entity.Price = event.params.price;
  entity.Likes = event.params.noOfLikes;
  entity.Stars = event.params.noOfStars;
  entity.OwnerId = event.params.artisteId;
  entity.LikesAddresses =[];
  entity.StarredAddresses = [];

  let user = User.load(event.params.artisteId.toString());
  if(!user) {
    return ;
  }
  let total = parseInt(user.TotalUploaded.toString());
  total +=1;

  user.TotalUploaded = event.params.total;
  user.save()

  entity.save()
}

export function handleuserRegistered(event: userRegistered): void {
  let entity = User.load(event.params.userId.toString())

  if (!entity) {
    entity = new User(event.params.userId.toString())
  }
  entity.Name = event.params.userName;
  entity.Email= event.params.userEmail;
  entity.Adddress = event.params.userAddress;
  entity.AlbumSongs = event.params.noOfSongsInAlbum;
  entity.TotalUploaded = event.params.noOfUploadedSongs;
  entity.Date = event.params.dateRegistered;
  entity.Followers = event.params.noOfFollowers;
  entity.FollowersAddresses = [];

  entity.save()
}
