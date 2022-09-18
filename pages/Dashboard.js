import React from "react";
import styles from "../styles/Dashboard.module.css";
import { BsSuitHeart } from "react-icons/bs";
import { FiPlay } from "react-icons/fi";
import TunifyAbi from "../artifacts/contracts/Tunify.sol/Tunify.json";
import { TunifyAddress, ApiUri } from "../constant";
import { useContract, useSigner, useAccount } from "wagmi";
import { createClient } from "urql";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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

export default function Dashboard(props) {
  const { data } = useAccount();
  const person = data?.address;
  const [name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [AMember, setAMember] = useState(false);
  const [loadingpage, setLoadingPage] = useState(false);
  const { data: signer } = useSigner();

  const contractWithSigner = useContract({
    addressOrName: TunifyAddress,
    contractInterface: TunifyAbi.abi,
    signerOrProvider: signer,
  });

  useEffect(() => {
    checkIfAMember(props);
  }, []);

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

  const renderButton = () => {
    if (!AMember) {
      return <>{/* ask the person to login */}</>;
    }
    if (AMember) {
      return (
        <div className={styles.dashHome}>
          <div className={styles.head}>
            <h1>Discover</h1>
          </div>
          <div className={styles.discover}>
            <div className={styles.library}>
              <h4>Your Library</h4>
              <div className={styles.songs}>
                <p>1.</p>
                <p>The Divine Feminine </p>
                <p> Mac Miller</p>
                <p>3:57</p>
                <FiPlay />
              </div>
            </div>
            <div className={styles.uploads}>
              <h4>New uploads</h4>
              <div className={styles.songs}>
                <p>1.</p>
                <p>The Divine Feminine </p>
                <p> Mac Miller</p>
                <p>3:57</p>
                <BsSuitHeart />
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <>{renderButton()}</>;
}

async function GetData() {
  const data = await client.query(UsersQuery).toPromise();
  return data.data.users;
}

export async function getServerSideProps() {
  const data = await GetData();
  return {
    props: {
      users: data,
    },
  };
}
