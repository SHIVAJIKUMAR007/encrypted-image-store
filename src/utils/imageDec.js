import CryptoJS from "crypto-js";

export const appendImages = (images, key) => {
  let allMedia = document.getElementById("allMedia");
  allMedia.innerHTML = "";
  for (let i in images) {
    let div = document.createElement("div");

    console.log(images[i].mediaData);
    var bytes = CryptoJS.AES.decrypt(images[i].mediaData, key);
    var imageBase64 = bytes.toString(CryptoJS.enc.Utf8);
    console.log(imageBase64);
    let p = document.createElement("p");
    p.innerText = `${parseInt(i) + 1})\n`;
    var image = new Image();
    image.src = imageBase64;
    image.classList.add("img-fluid");
    image.style.width = "100%";
    div.appendChild(p);
    div.appendChild(image);
    div.style.margin = "10px";

    allMedia.appendChild(div);
  }
};
