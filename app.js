let artist = "";
let title = "";
const url1 = "https://api.lyrics.ovh/suggest/";
const url2 = "https://api.lyrics.ovh/v1/";

document.getElementById("search-btn").addEventListener("click", function () {
    document.getElementById("error-message-song").style.display = "none";
    document.getElementById("error-message-lyric").style.display = "none";
    let childCount = document.getElementById("search-result").childElementCount;
    document.getElementById("lyric-container").style.display = "none";
    if (childCount > 1) {
        for (let i = 0; i < childCount - 1; i++) {
            document.getElementById("search-result").removeChild(document.getElementById("search-result").lastChild);
        }
        childCount = 1;
    }

    let searchText = document.getElementById("search-text").value;

    fetch(`${url1}${searchText}`)
        .then(res => res.json())
        .then(data1 => {
            console.log(data1);
            if (data1.data.length == 0) {
                document.getElementById("error-message-song").style.display = "block";
            }
            else {
                for (let i = 0; i < 10; i++) {
                    title = data1.data[i].title;
                    artist = data1.data[i].artist.name;
                    addNewResult();
                }
                childCount = 11;
                const lyricBtn = document.getElementsByClassName("lyric-btn");
                for (let i = 0; i < lyricBtn.length; i++) {
                    const btn = lyricBtn[i];

                    btn.addEventListener("click", function () {
                        document.getElementById("error-message-lyric").style.display = "none";
                        document.getElementById("lyric").innerText = "";
                        document.getElementById("lyric-artist").innerText = "";
                        let lyricSong = this.parentElement.parentElement.querySelector("h3").innerText;
                        let lyricArtist = this.parentElement.parentElement.querySelector("span").innerText;
                        fetch(`${url2}${lyricArtist}/${lyricSong}`)
                            .then(res => res.json())
                            .then(data2 => {
                                console.log(data2);
                                if (data2.lyrics == undefined) {
                                    document.getElementById("error-message-lyric").style.display = "block";
                                    document.getElementById("error-message-lyric").scrollIntoView();
                                }
                                else {
                                    document.getElementById("lyric-container").style.display = "block";
                                    document.getElementById("lyric").innerText = data2.lyrics;
                                    document.getElementById("lyric-artist").innerText = `${lyricArtist} - ${lyricSong}`;
                                    document.getElementById("lyric-artist").scrollIntoView();
                                }
                            })
                    })
                }
            }
        })

})

function addNewResult() {
    const item = document.getElementById("search-result").firstElementChild;
    const cln = item.cloneNode(true);
    cln.querySelector("h3").innerText = title;
    cln.querySelector("span").innerText = artist;
    cln.style.display = "block";
    cln.id = "";
    document.getElementById("search-result").appendChild(cln);
}