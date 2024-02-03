import React, { useEffect, useState } from "react";
import { contractAddress, abi } from "./constants";
import "./Voting.css";
import { ethers } from "ethers";
import { useSearchParams } from "react-router-dom";

const URL = "http://localhost:8080";

function Voting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const res = await fetch(URL + "/data");
    const data = await res.json();
  };

  const [wallet, setWallet] = useState("");
  useEffect(() => {
    const token = searchParams.get("token");
    (async () => {
      console.log("fetching data");
      const res = await fetch(URL + "/voter/validateToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const msg = await res.json();
      console.log(msg);
      if (msg.error) {
        alert("Unauthorized access");
        setIsLoading(false);
        return;
      }
    })();
    console.log(token);
    (async () => {
      const res = await fetch(URL + "/election");
      console.log(res);
      const data = await res.json();
      console.log("fetching data");
      console.log(data);
      setCandidates(data.candidates);
      console.log(candidates);
    })();

    setIsLoading(true);
  }, []);
  const partyCandidates = [
    {
      name: "Candidate A",
      description: "Description for Candidate A",
      imageUrl: "url_for_candidate_a_image",
    },
    {
      name: "Candidate B",
      description: "Description for Candidate B",
      imageUrl: "url_for_candidate_b_image",
    },
    {
      name: "Candidate A",
      description: "Description for Candidate A",
      imageUrl: "url_for_candidate_a_image",
    },
    {
      name: "Candidate B",
      description: "Description for Candidate B",
      imageUrl: "url_for_candidate_b_image",
    },
    {
      name: "Candidate A",
      description: "Description for Candidate A",
      imageUrl: "url_for_candidate_a_image",
    },
    {
      name: "Candidate B",
      description: "Description for Candidate B",
      imageUrl: "url_for_candidate_b_image",
    },
    // Add more candidates as needed
  ];

  const handleVote = async (e) => {
    const contract = await connectWallet();
    const candidate = e.target.getAttribute("data-value");
    setVotedFor(candidate);
    let transactionResponse;
    try {
      transactionResponse = await contract.voteForCandidate(candidate);
    } catch (error) {
      console.error(error);
    }
    setHasVoted(true);

    const transactionReceipt = await transactionResponse.wait();
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      console.log(signer);
      console.log("MetaMask is installed!");
      return new ethers.Contract(contractAddress, abi, signer);
    }
  };

  const requestAccount = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("MetaMask detected");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWallet(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please install MetaMask!");
      return;
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          {!hasVoted ? (
            <>
              <div>
                <button onClick={requestAccount}>Connect To Metamask</button>
                <p>Metamask Address: {wallet}</p>
              </div>
              {wallet ? (
                <>
                  <h2 className="voting-heading">Voting</h2>
                  <div className="voting-container">
                    {candidates.map((candidate, index) => (
                      <div key={index} className="inner-con">
                        <img
                          src={candidate.imgUrl}
                          alt={candidate.name}
                          className="candidate-image"
                        />
                        <h3>{candidate.name}</h3>
                        <p>{candidate.description}</p>
                        <button
                          onClick={handleVote}
                          data-value={candidate.name}
                        >
                          Vote
                        </button>
                      </div>
                    ))}
                  </div>{" "}
                </>
              ) : (
                <p>Connect your Metamask</p>
              )}
            </>
          ) : (
            <p>Congratulations, you're vote towards {votedFor} is successful</p>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default Voting;
