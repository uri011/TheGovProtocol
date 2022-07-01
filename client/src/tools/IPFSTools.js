import axios from 'axios';

import { ipfsProjectID } from '../utils/constants';

export const getCensus = async (ipfsHash) => {

    const response = await axios.post('https://ipfs.infura.io:5001/api/v0/get?arg=' + ipfsHash, {});

    let res = response.data.split('<>');
    res = res[1].split(',');

    return res;
};

export const postCensus = async (data, secret) => {

    const auth = window.btoa(ipfsProjectID + ':' + secret);

    const file = String(data);

    let invalidSecret = false;

    const res = await axios({
        method: 'post',
        url: 'https://ipfs.infura.io:5001/api/v0/add',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Basic ' + auth
        },
        data: {
            file: '<>' + file + '<>',
        }
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            invalidSecret = true;
        }
    });

    if (invalidSecret) {
        return -1;
    } else {
        return res.data.Hash;
    };
};

export const unpinCensus = async (ipfsHash, secret) => {

    const auth = window.btoa(ipfsProjectID + ':' + secret);

    const res = await axios({
        method: 'post',
        url: 'https://ipfs.infura.io:5001/api/v0/pin/rm?arg=' + ipfsHash,
        headers: {
            'Authorization': 'Basic ' + auth
        }
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
    });;

    return res;
}