import React from "react";
import styles from "../styles/Upload.module.css";
import lighthouse from "@lighthouse-web3/sdk";
import TunifyAbi from "../artifacts/contracts/Tunify.sol/Tunify.json";
import { TunifyAddress, ApiUri } from "../constant";
import { useContract, useSigner, useAccount } from "wagmi";
import { createClient } from "urql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UserQuery = `
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

export default function Upload(props) {
  const { data } = useAccount();
  const person = data?.address;
  const [AMember, setAMember] = useState(false);
  const [Id, setIdr] = useState(0);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const [songName, setSongName] = useState();
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(false);

  const { data: signer, isError, isLoading } = useSigner();
  const contractWithSigner = useContract({
    addressOrName: TunifyAddress,
    contractInterface: TunifyAbi.abi,
    signerOrProvider: signer,
  });

  const router = useRouter();

  useEffect(() => {
    checkIfAMember(props);
  }, []);

  const Tunes = () => {
    router.push("/Tunes");
  };

  const Deploy = async (e) => {
    const output = await lighthouse.deploy(e, process.env.Api - Key);
    setFile(output.Hash);
  };

  const checkIfAMember = async (props) => {
    try {
      let data = props.users;
      const addresses = [""];
      const tx = await Promise.all(
        data.map(async (i) => {
          addresses.push(i.Adddress);
          return addresses;
        })
      );
      const Address = person.toLowerCase();
      const isThere = addresses.includes(Address);
      setAMember(isThere);
    } catch (e) {
      console.log(e);
      setAMember(false);
    }
  };

  const Upload = async (id) => {
    try {
      let time = new Date().toLocaleString();
      const create = await contractWithSigner.uploadSongs(
        price,
        songName,
        type,
        genre,
        id,
        file,
        time
      );
      await create.wait();
      setLoading(false);
      Tunes();
    } catch (error) {
      console.log(error);
    }
  };
  const renderButton = () => {
    if (!AMember) {
      return <>
      {/* ask the person to login */}
      </>;
    }
    if (AMember) {
      return (
        <div className={styles.uploadMain}>
          <h1>Upload Your Own Music and Get Paid for Every Download</h1>
          <input type="Text" placeholder="Song Title"/>
          <input type="Text" placeholder="Genre"/>
          <input type="number" placeholder="Price"/>
          <input type="file" accept="audio/*" />
          <button>Upload to Tunify NOW!</button>
        </div>
      );
    }
  };

  return <>{renderButton()}</>;
}

async function Users() {
  const data = await client.query(UserQuery).toPromise();
  return data.data.users;
}
export async function getServerSideProps() {
  const data = await Users();
  return {
    props: {
      users: data,
    },
  };
}
