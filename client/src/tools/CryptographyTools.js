import { ethers } from 'ethers';
import { MerkleTree } from 'merkletreejs';

const computeLeaf = (addr, id) => {
    return ethers.utils.solidityKeccak256(["address", "uint256"], [addr, id]);
};

const computeMerkleTree = (census) => {
    const leaves = census.map(censusID => computeLeaf(censusID.substr(0, censusID.length - 10), parseInt(censusID.substr(censusID.length - 10))));
    return new MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true });
};

export const computeMerkleProof = (addr, id, census) => {
    const leaf = computeLeaf(addr, id);
    const merkleTree = computeMerkleTree(census);
    return merkleTree.getHexProof(leaf);
};

export const computeMerkleRoot = (census) => {
    const merkleTree = computeMerkleTree(census);
    return merkleTree.getHexRoot();
};