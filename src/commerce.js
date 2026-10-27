import {tomorrow} from './storeData.js';
export function orderTotals(cart,mode){const subtotal=cart.reduce((total,item)=>total+item.price*item.qty,0);const shipping=cart.length?(mode==='pickup'?0:mode==='local'?8:12):0;return {subtotal,shipping,total:subtotal+shipping};}
export function fulfillmentError({mode,zip,date,cart=[]},minimumDate=tomorrow()){
 if(!['ship','pickup','local'].includes(mode))return 'Please choose shipping, pickup, or local delivery.';
 if(!date||date<minimumDate)return 'Please choose a date from tomorrow onward.';
 if(mode!=='pickup'&&!/^\d{5}$/.test(zip||''))return 'Please enter a five-digit U.S. ZIP code.';
 if(mode==='local'&&!/^(100|112)\d{2}$/.test(zip))return 'Local delivery serves ZIP codes beginning with 100 or 112. Choose shipping or pickup for another area.';
 if(mode==='ship'&&cart.some(p=>p.localOnly||[5,8].includes(p.productId||p.id)))return 'Pudding and breakfast bakes need local pickup or delivery. Please choose one of those options, or remove them from your bag.';
 return '';
}
