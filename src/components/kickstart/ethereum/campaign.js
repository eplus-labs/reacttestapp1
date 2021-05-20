import ethEnabled from './web3';
import Campaign from './build/Campaign.json';

export default async address => {
  let web3 = await ethEnabled()
  return await new web3.eth.Contract(JSON.parse(Campaign.interface), address);
};