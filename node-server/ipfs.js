const ipfsClient = require('ipfs-http-client');
const Buffer = require('buffer').Buffer;

const ipfsWrap = {};

ipfsWrap.node = null;

ipfsWrap.init = () => {

    ipfsWrap.node = ipfsClient({
        host: 'ipfs.infura.io',
        protocol: 'https',
    });

    return ipfsWrap;
};


ipfsWrap.writeFile = (buffer) => {

    return ipfsWrap.node.add({
        content: buffer
    });
};

// DEBUG WITH QmQjqVu5qsd4PPqJnTcLXmvznMw7X2UEjtLP9NKCtwWMx3
ipfsWrap.getFile = async (hash) => {

    try {
        const data = await ipfsWrap.node.cat(hash);
        return Buffer.from(data);
    } catch (e) {
        console.error('ipfs cat', e.message, hash);
    }

};

module.exports = ipfsWrap.init();
