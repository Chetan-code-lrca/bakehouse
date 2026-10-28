/* ===== EDIT THESE ===== */
var SHOP = {
  name: "Nandhu’s Bakehouse",
  whatsapp: "919999999999",          // country code + number, no + or spaces
  phoneDisplay: "+91 99999 99999",
  address: "Udaipur, Rajasthan",
  openHour: 8, closeHour: 21,         // 24-hour clock: 8 = 8 AM, 21 = 9 PM
  hoursText: "Every day, 8 AM to 9 PM"
};
var MENU = [
  {id:"croissant", cat:"Breads", name:"Butter croissant", desc:"Flaky and buttery", price:60},
  {id:"multigrain", cat:"Breads", name:"Multigrain loaf", desc:"Baked fresh each morning", price:90},
  {id:"garlic", cat:"Breads", name:"Garlic bread", desc:"With herbs and butter", price:80},
  {id:"bun", cat:"Breads", name:"Whole wheat buns (4)", desc:"Soft and light", price:50},
  {id:"truffle", cat:"Cakes", name:"Chocolate truffle (500 g)", desc:"Rich, with dark chocolate", price:550},
  {id:"pineapple", cat:"Cakes", name:"Pineapple cake (500 g)", desc:"Fresh cream and fruit", price:450},
  {id:"vanilla", cat:"Cakes", name:"Eggless vanilla slice", desc:"Light and fluffy", price:70},
  {id:"puff", cat:"Snacks", name:"Veg puff", desc:"Hot from the oven", price:30},
  {id:"sandwich", cat:"Snacks", name:"Paneer sandwich", desc:"Grilled, with mint chutney", price:70},
  {id:"cookies", cat:"Snacks", name:"Oatmeal cookies (6)", desc:"Jaggery sweetened", price:120},
  {id:"chai", cat:"Drinks", name:"Masala chai", desc:"Made with fresh ginger", price:30},
  {id:"coffee", cat:"Drinks", name:"Cold coffee", desc:"Thick and chilled", price:90},
  {id:"lime", cat:"Drinks", name:"Fresh lime soda", desc:"Sweet or salted", price:50}
];
/* ===== END EDIT ===== */

(function(){
var $=function(i){return document.getElementById(i)};
var cart={},cat="All";
var cats=["All"].concat(MENU.map(function(m){return m.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));
function rs(n){return "₹"+n}

function status(){
  var h=new Date().getHours(),open=h>=SHOP.openHour&&h<SHOP.closeHour,el=$("status");
  function t(x){return (x%12||12)+" "+(x<12||x===24?"AM":"PM")}
  el.textContent=open?"Open now until "+t(SHOP.closeHour):"Closed now. Opens at "+t(SHOP.openHour);
  el.className="status"+(open?"":" closed");
}
function chips(){
  var box=$("chips");box.innerHTML="";
  cats.forEach(function(c){
    var b=document.createElement("button");b.textContent=c;b.setAttribute("aria-pressed",c===cat);
    b.onclick=function(){cat=c;chips();items()};box.appendChild(b);
  });
}
function items(){
  var ul=$("items");ul.innerHTML="";
  MENU.filter(function(m){return cat==="All"||m.cat===cat}).forEach(function(m){
    var li=document.createElement("li");
    var info=document.createElement("div");info.className="info";
    var h=document.createElement("h5");h.textContent=m.name;
    var d=document.createElement("div");d.className="desc";d.textContent=m.desc;
    info.appendChild(h);info.appendChild(d);
    var p=document.createElement("span");p.className="price";p.textContent=rs(m.price);
    var b=document.createElement("button");b.className="add";b.textContent="Add";
    b.setAttribute("aria-label","Add "+m.name+" to order");
    b.onclick=function(){cart[m.id]=(cart[m.id]||0)+1;order()};
    li.appendChild(info);li.appendChild(p);li.appendChild(b);ul.appendChild(li);
  });
}
function order(){
  var ul=$("cart");ul.innerHTML="";var total=0,lines=[];
  MENU.forEach(function(m){
    var q=cart[m.id];if(!q)return;
    total+=q*m.price;lines.push("- "+q+" x "+m.name+" ("+rs(q*m.price)+")");
    var li=document.createElement("li");
    var n=document.createElement("span");n.textContent=m.name;
    var qb=document.createElement("div");qb.className="qty";
    var minus=document.createElement("button");minus.textContent="−";minus.setAttribute("aria-label","Remove one "+m.name);
    var num=document.createElement("span");num.textContent=q;
    var plus=document.createElement("button");plus.textContent="+";plus.setAttribute("aria-label","Add one "+m.name);
    minus.onclick=function(){cart[m.id]--;if(cart[m.id]<=0)delete cart[m.id];order()};
    plus.onclick=function(){cart[m.id]++;order()};
    qb.appendChild(minus);qb.appendChild(num);qb.appendChild(plus);
    li.appendChild(n);li.appendChild(qb);ul.appendChild(li);
  });
  if(!lines.length){var e=document.createElement("li");e.className="empty";e.textContent="Nothing added yet.";ul.appendChild(e)}
  $("total").textContent=rs(total);
  var send=$("send"),has=lines.length>0;
  send.setAttribute("aria-disabled",!has);
  $("note").textContent=has?"Opens WhatsApp with your order ready to send.":"Add items to start your order.";
  var name=$("cname").value.trim();
  var msg="Hi "+SHOP.name+", I’d like to order:\n"+lines.join("\n")+"\nTotal: "+rs(total)+(name?"\nName: "+name:"");
  send.href=has?"https://wa.me/"+SHOP.whatsapp+"?text="+encodeURIComponent(msg):"#";
  send.target=has?"_blank":"";send.rel="noopener";
}
$("cname").oninput=order;
$("hours").textContent=SHOP.hoursText;
$("addr").textContent=SHOP.address;
$("contact").textContent=SHOP.phoneDisplay+" (call or WhatsApp)";
status();chips();items();order();
setInterval(status,60000);
})();
