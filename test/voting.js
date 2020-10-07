const Voting = artifacts.require("Voting");
const truffleAssert = require('truffle-assertions');

contract("Voting", async accounts => {
    it("voting state should start as closed (false).", async () => {
        const instance = await Voting.deployed();
        const votingState = await instance.isVotingOpen();
        assert.equal(votingState, false, "Voting state should start as false (voting closed).");
    });

    it("candidate vote count should start at 0.", async () => {
        const instance = await Voting.deployed();
        const candidate = await instance.candidates(1);
        assert.equal(candidate.voteCount, 0, "Invalid initial candidate vote count.");
    });

    it("should not allow voting when voting state is false (voting closed).", async () => {
        const instance = await Voting.deployed();
        await truffleAssert.fails(
            instance.vote(1, { from: accounts[1] }),
            truffleAssert.ErrorType.REVERT
        );
    });

    it("fails when an account that is not the owner tries to change voting state.", async () => {
        const instance = await Voting.deployed();
        await truffleAssert.fails(
            instance.setVotingState(true, { from: accounts[1] }),
            truffleAssert.ErrorType.REVERT,
        );
    });

    it("allows the owner to change voting state", async () => {
        const instance = await Voting.deployed();
        await truffleAssert.passes(
            instance.setVotingState(true, { from: accounts[0] }),
            'The owner of the contract should be able to change the voting state.'
        );
    });

    it("allows an account address to vote", async () => {
        const instance = await Voting.deployed();
        await truffleAssert.passes(
            instance.vote(1, { from: accounts[1] })
        );
    });

    it("only allows a unique vote per account address", async () => {
        const instance = await Voting.deployed();
        await truffleAssert.fails(
            instance.vote(1, { from: accounts[1] })
        );
    });
});