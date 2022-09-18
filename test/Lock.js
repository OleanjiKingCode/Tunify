const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
   
    const [owner, SecondAdd,third] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Tunify");
    const tunify = await Lock.deploy();
    await tunify.deployed();
    console.log(tunify.address)
    return { tunify, owner, SecondAdd,third };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      
      const { tunify, SecondAdd,third } = await loadFixture(deployOneYearLockFixture);
      
         
          let today = new Date().toISOString().slice(0, 10);
          const addr =  await SecondAdd.getAddress()
          const addr2 =  await third.getAddress()
          const createMember = await tunify.connect(SecondAdd).registerUsers("first kid", addr, "userEmail@gmail.com" ,today);
          const createMember2 = await tunify.connect(third).registerUsers("second", addr2, "userEmail@gmail.com" ,today);
          const fetchUsers= await tunify.connect(SecondAdd).fetchUsers();
          console.log(fetchUsers);
         
          
          let another = new Date().toISOString().slice(0, 10);
          await tunify.connect(SecondAdd).uploadSongs(0,"Fellin U","jpeg","Rap",1, "fileOfSong", another);
          await tunify.connect(third).uploadSongs(0,"love","jpeg","Rap",1, "fileOfSong", another);
      
          let AllSong= await tunify.fetchAllSongs()
          console.log(AllSong)
          let downlaod = await tunify.connect(SecondAdd). downloadSongs(1,1);
         
          console.log("liking song")
          await tunify.connect(third).likeSong("1");
      
          console.log("staring song")
          await tunify.connect(SecondAdd).StarSong("2");
      
          const album = await tunify.connect(third).WhatDidILike(1,addr2);
          console.log(album)

          const like = await tunify.connect(SecondAdd).WhatDidIAddtoAlbum(2,addr);
          console.log(like)
          const Allmeme = await tunify.fetchAllSongs()
          console.log(Allmeme)
      
          const fetchUser= await tunify.connect(third).fetchUsers();
          console.log(fetchUser);
      
      });
    });
});
