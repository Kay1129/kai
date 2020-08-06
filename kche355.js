window.onload = function () {
    let oMunuBar = document.getElementById("menuBar");
    let oLi = oMunuBar.getElementsByTagName("li");
    var oSection = document.getElementsByTagName("section");
    var ONews = document.getElementById("news");
    var oTitle = document.getElementsByTagName("h2");
    var oProduct = document.getElementById("products");
    var oInput = oProduct.getElementsByTagName("input")[0];

    for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onclick = function () {
            for (var j = 0; j < oLi.length; j++) {
                console.log(oSection[j].innerHTML);
                oSection[j].style.display = "none";
                oLi[j].style.backgroundColor = "white";
            }
            // if(this.index == 0){
            //     oSection[this.index].style.display = "block";
            // }
            // else{
            //     oSection[this.index].style.display = "block";
            //     oSection[this.index].innerHTML == "";
            //     showSource(oSection[this.index], this.index,oTitle);
            // }
            oLi[this.index].style.backgroundColor = "gray";
            if (oTitle[this.index].innerHTML == "Dunedin Dairy") {
                oSection[this.index].style.display = "block";
                showSource(oSection[this.index], this.index, oTitle[this.index]);
            } else {
                oSection[this.index].style.display = "block";
            }
        }
    };

    showSource = function (item, index, title) {
        if(index ==1){
            title.innerHTML ="Products";
            // http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id={ID}
            var fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/items",{
                headers : {
                    "Accept" : "application/json",
                },
            });
            const streamPromise = fetchPromise.then((response) => response.json());
            streamPromise.then(function(data){
                console.log(data);
                // oSearchBar = document.createElement("input");
                // item.appendChild(oSearchBar);
                showProduct(item,data);
            })
        }

        if (index == 2) {
            title.innerHTML = "News";
            // title.innerHTML = "News";
            const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/news", {
                headers: {
                    "Accept": "application/json",
                },
            });
            const streamPromise = fetchPromise.then((response) => response.json());
            // const test = streamPromise.then((data) => {console.log(data)});
            streamPromise.then(function (data) {
                // data1 = JSON.parse(data);
                console.log(data);
                showNews(item,data);

            });
        }

        if (index == 3) {
            title.innerHTML = "Location";
            // title.innerHTML = "News";
            const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/vcard", {
                headers: {
                    "Accept": "application/json",
                },
            });
            const streamPromise = fetchPromise.then((response) => response.text());
            // const test = streamPromise.then((data) => {console.log(data)});
            streamPromise.then(function (data) {
                // data1 = JSON.parse(data);
                console.log(data);
                // showNews(item,data);

            });
        }

    }

    showProduct = function(item,data){
        for(let i=0; i<data.length; i++){
            let oBox = document.createElement("div");
            oBox.setAttribute("class","productBox");
            item.appendChild(oBox);
            
            // let oImgBox = document.createElement("div");
            // oBox.appendChild(oImgBox);
            // oImgBox.setAttribute("class","imgBox");

            let oImg = document.createElement("img");
            oBox.appendChild(oImg);
            let oImgID = data[i].ItemId;
            oImg.setAttribute("src", "http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/itemimg?id=" + oImgID);

            let oTextBox = document.createElement("div");
            oBox.appendChild(oTextBox);
            oTextBox.setAttribute("class","textBox");

            let oProUl = document.createElement("ul");
            oTextBox.appendChild(oProUl);

            let oTitle = document.createElement("li");
            oTitle.innerHTML = data[i].Title;
            oTitle.style.fontWeight = "bold";
            oTitle.style.fontSize = "18px";
            oProUl.appendChild(oTitle);

            let oPrice = document.createElement("li");
            oPrice.innerHTML = data[i].Price;
            oProUl.appendChild(oPrice);

            let oType = document.createElement("li");
            oType.innerHTML = data[i].Type;
            oProUl.appendChild(oType);

            let oOrigin = document.createElement("li");
            oOrigin.innerHTML = data[i].Origin;
            oProUl.appendChild(oOrigin);

            let oButton = document.createElement("button");
            oTextBox.appendChild(oButton);
            // oButton.setAttribute("type","button");
            // oButton.setAttribute("name","Buy Now");
            oButton.textContent = "Buy Now";
        }
    }

    showNews = function(item,data){
        for (let i = 0; i < data.length; i++) {
            let oBox = document.createElement("div");
            oBox.setAttribute("class","newsBox");
            item.appendChild(oBox);

            // var oImgBox = document.createElement("div");
            // oBox.appendChild(oImgBox);
            // oImgBox.setAttribute("id","oImgBox");

            let oImg = document.createElement("img");
            // var oImgField = document.createTextNode(data[i].linkField);
            oBox.appendChild(oImg);
            oImg.setAttribute("src", data[i].enclosureField.urlField);
            // oImg.style.width="30%";

            // oBox.appendChild(oBreak);

            let oTitle = document.createElement("a");
            oBox.appendChild(oTitle);
            oTitle.innerHTML = data[i].titleField;
            oTitle.setAttribute("href", data[i].linkField);
            // oTitle.style.textDecoration="none";
            // oTitle.style.color="black";

            let oPubDate = document.createElement("span");
            oBox.appendChild(oPubDate);
            let oPubDateField = document.createTextNode(data[i].pubDateField);
            oPubDate.appendChild(oPubDateField);

            // oBox.appendChild(oBreak);

            let oDesc = document.createElement("p");
            oBox.appendChild(oDesc);
            let oDescField = document.createTextNode(data[i].descriptionField);
            oDesc.appendChild(oDescField);
            
            // oBox.appendChild(oBreak);
        }
    }

    oInput.oninput = function(){
        oProductBox = document.getElementsByClassName("productBox");
        // for(let i=0;i<oProductBox.length;i++){
        //     oProductBox[i].innerHTML = "";
        // }
        for(var i=oProductBox.length-1;i>=0;i--){
            oProduct.removeChild(oProductBox[0]);
        }

        const fetchPromise = fetch("http://redsox.uoa.auckland.ac.nz/ds/DairyService.svc/search?term="+oInput.value, {
            headers: {
                "Accept": "application/json",
            },
        });
        const streamPromise = fetchPromise.then((response) => response.json());
        // const test = streamPromise.then((data) => {console.log(data)});
        streamPromise.then(function (data) {
            // data1 = JSON.parse(data);
            console.log(data);
            showProduct(oProduct,data);
        });
    }
}