import React from "react";
import styles from "../styles/Tunes.module.css";
import { BsPlayCircleFill, BsSuitHeart } from "react-icons/bs";
import { ImStarEmpty } from "react-icons/im";
import TunifyAbi from "../artifacts/contracts/Tunify.sol/Tunify.json";
import { TunifyAddress, ApiUri } from "../constant";
import { useContract, useSigner, useAccount, useProvider } from "wagmi";
import { createClient } from "urql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SongsQuery = `
query {
  songs(
    orderBy : id,
    orderDirection: desc
        ) 
    {
      id
      Name
      FileLink
      Date
      FileType
      Price
      Genre
      OwnerId
      OwnerAddress
      Stars
      Likes
      LikesAddresses
      StarredAddresses
    }
}
`;

const UsersQuery = `
query {
  users{
    id
    Name
    Email
    Adddress
    AlbumSongs
    TotalUploaded
    Date
  }
}
`;

const client = createClient({
  url: ApiUri,
});

export default function Tunes(props) {
  console.log(props)
  const Songslength = props.songs.length;
  const { data } = useAccount();
  const person = data?.address;
  const [loadingStar, setLoadingStar] = useState(false);
  const [songsInfo, setsongsInfo] = useState([]);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingLikeId, setLoadingLikeId] = useState(0);
  const [loadingStarId, setLoadingStarId] = useState(0);
  const provider = useProvider();
  const { data: signer } = useSigner();
  const [loadingpage, setLoadingPage] = useState(false);
  const contractWithSigner = useContract({
    addressOrName: TunifyAddress,
    contractInterface: TunifyAbi.abi,
    signerOrProvider: signer,
  });
  const contractWithProvider = useContract({
    addressOrName: TunifyAddress,
    contractInterface: TunifyAbi.abi,
    signerOrProvider: provider,
  });

  useEffect(() => {
    FetchSongs(props);
  }, []);

  const StarMusic = async (id) => {
    try {
      const data = await contractWithSigner.StarSong(id);
      await data.wait();
      await FetchSongs(props);
    } catch (e) {
      console.log(e);
    }
  };
  const FollowArtist = async (id) => {
    try {
      const data = await contractWithSigner.followArtist(id);
      await data.wait();
      await FetchSongs(props);
    } catch (e) {
      console.log(e);
    }
  };
  const FetchSongs = async (props) => {
    let data = props.memes;
    if (data){
    const tx = await Promise.all(
      data.map(async (i) => {
        const StarAnswer = signer
          ? await contractWithProvider.WhatDidIAddtoAlbum(i.id, person)
          : false;
        const LikeAnswer = signer
          ? await contractWithProvider.WhatDidILike(i.id, person)
          : false;
        const info = await axios.get(`https://ipfs.io/ipfs/${FileLink}`);
        let List = {
          Name: i.Name,
          image: info.data.image,
          Price: i.Price,
          Owner: i.OwnerAddress,
          Genre: i.Genre,
          File: info,
          NumberOfStars: i.Stars,
          NumberOfLikes: i.Likes,
          Date: i.Date,
          Id: i.id,
          FileType: i.FileType,
          DidUserStarMe: StarAnswer,
          DidUserLikeMe: LikeAnswer,
        };
        return List;
      })
    ); 
    setsongsInfo(tx);
    }
  };

  return (
    <div className={styles.tunesHome}>
      <div className={styles.head}>
        <h1>Discover</h1>
      </div>
      <div className={styles.music}>
        <div className={styles.card}>
          <img src="/luffy.png"></img>
          <div className={styles.cardHeader}>
            <h4>LUFFY #34</h4>
            <ImStarEmpty size={25} />
          </div>
          <h5>PIRATE KING FLOW</h5>
          <p>card description</p>
          <div className={styles.playBtn}>
            <BsPlayCircleFill size={50} />
          </div>
        </div>
        <div className={styles.card}>
          <img src="/Megumi.png"></img>
          <div className={styles.cardHeader}>
            <h4>LUFFY #34</h4>
            <button className={{padding:"3px"}} >
            Follow 
          </button>
            <ImStarEmpty size={25} />
          </div>
          <h5>PIRATE KING FLOW</h5>
          <p>card description</p>
          <div className={styles.playBtn}>
            <BsPlayCircleFill size={50} />
          </div>
        </div>
        <div className={styles.card}>
          <img src="/luffy.png"></img>
          <div className={styles.cardHeader}>
            <h4>LUFFY #34</h4>
            <ImStarEmpty size={25} />
          </div>
          <h5>PIRATE KING FLOW</h5>
          <p>card description</p>
          <div className={styles.playBtn}>
            <BsPlayCircleFill size={50} />
          </div>
        </div>
      </div>
    </div>
  );
}

async function GetData() {
  const data = await client.query(SongsQuery).toPromise();
  return data.data.songs;
}
async function UsersInfo() {
  const info = await client.query(UsersQuery).toPromise();
  return info.data.users;
}

export async function getServerSideProps() {
  const data = await GetData();
  const info = await UsersInfo();
  return {
    props: {
      songs: data,
      users: info,
    },
  };
}
