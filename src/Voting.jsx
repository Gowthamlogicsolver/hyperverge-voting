import React from 'react';
import './Voting.css';

function Voting() {
  const partyCandidates = [
    { name: 'Candidate A', description: 'Description for Candidate A', imageUrl: 'url_for_candidate_a_image' },
    { name: 'Candidate B', description: 'Description for Candidate B', imageUrl: 'url_for_candidate_b_image' },
    { name: 'Candidate A', description: 'Description for Candidate A', imageUrl: 'url_for_candidate_a_image' },
    { name: 'Candidate B', description: 'Description for Candidate B', imageUrl: 'url_for_candidate_b_image' },
    { name: 'Candidate A', description: 'Description for Candidate A', imageUrl: 'url_for_candidate_a_image' },
    { name: 'Candidate B', description: 'Description for Candidate B', imageUrl: 'url_for_candidate_b_image' },
    // Add more candidates as needed
  ];

  return (
    <>
    <h2 className="voting-heading">Voting</h2>
    <div className="voting-container">
      {partyCandidates.map((candidate, index) => (
        <div key={index} className="inner-con">
          <img src={candidate.imageUrl} alt={candidate.name} className="candidate-image" />
          <h3>{candidate.name}</h3>
          <p>{candidate.description}</p>
        </div>
      ))}
    </div>
    </>
  );
}

export default Voting;
