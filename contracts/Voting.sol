// SPDX-License-Identifier: GPL
pragma solidity ^0.5.0;

contract Voting {
    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public voters;
    bool public isVotingOpen;
    address private owner;

    /// candidate data model
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    constructor() public {
        // set contract owner
        owner = msg.sender;

        // voting starts inactive
        isVotingOpen = false;

        // demo candidates
        candidates[1] = Candidate(1, "Candidate 1", 0);
        candidates[2] = Candidate(2, "Candidate 2", 0);
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Operation not allowed.");
        _;
    }

    modifier uniqueVote {
        require(
            voters[msg.sender] == false,
            "Only one vote per address is allowed."
        );
        _;
    }

    modifier votingOpen {
        require(isVotingOpen == true, "Voting is closed.");
        _;
    }

    modifier validCandidate(uint256 id) {
        require(candidates[id].id > 0, "Invalid candidate id.");
        _;
    }

    /// set voting state
    function setVotingState(bool state) external onlyOwner {
        isVotingOpen = state;
    }

    /// vote public
    function vote(uint256 candidateId)
        external
        votingOpen
        validCandidate(candidateId)
        uniqueVote
    {
        candidates[candidateId].voteCount++;
        voters[msg.sender] = true;
    }

    /// get vote count for specified candidate
    function getVoteCount(uint256 candidateId)
        external
        view
        validCandidate(candidateId)
        returns (uint256)
    {
        return candidates[candidateId].voteCount;
    }
}
