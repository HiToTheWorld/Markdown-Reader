let mds = document.getElementsByClassName("md")

let mdcss = document.createElement("link")
mdcss.rel = "old stylesheet"
mdcss.type = "text/css"
mdcss.href = serverhost + "projects/mdreader/md.css"
document.head.prepend(mdcss)

//runs through every MD element
for (let mden = 0; mden < mds.length; mden++) {
    let mde = mds[mden]
    let mdtext = mde.innerHTML.split("\n")
    let textHolder
    let addElem
    mde.innerHTML = ""
    let currentList = null
    let lineIsLink = false

    //runs through every MD line
    for (let mdln = 0; mdln < mdtext.length; mdln++) {
        let mdl = mdtext[mdln].trim()
        let mdlcs = mdl.split("")
        let numofhashes = 0

        //TAGS
        //runs through every MD line character
        for (let mdlcn = 0; mdlcn < mdlcs.length; mdlcn++) {
            if (mdlcs[mdlcn] == "#") {
                numofhashes += 1
            } else {
                break
            }
        }

        mdl = mdl.substr(numofhashes, mdlcs.length)
        mdlcs = mdl.split("")

        if (numofhashes > 6) {
            numofhashes = 6
        }

        let line
        if (numofhashes > 0) {
            line = document.createElement("h" + numofhashes)
        } else {
            line = document.createElement("p")
        }
        textHolder = line
        addElem = line

        //LISTS
        let li = null
        //unordered
        if (mdlcs[0] == "-" && mdlcs[1] == " ") {
            li = document.createElement("li")
            textHolder = li
            if (currentList && currentList.tagName != "UL") {
                mde.append(currentList)
                currentList = null
            }
            if (!currentList || currentList.tagName != "UL") {
                currentList = document.createElement("ul")
                console.log(currentList.tagName)
            }
            currentList.append(li)
            mdl = mdl.substring(2, mdlcs.length)
            mdlcs = mdl.split("")
        } else if (!isNaN(mdlcs[0]) && mdlcs[1] == ".") {
            li = document.createElement("li")
            textHolder = li
            if (currentList && currentList.tagName != "OL") {
                mde.append(currentList)
                currentList = null
            }
            if (!currentList || currentList.tagName != "OL") {
                currentList = document.createElement("ol")
            }
            currentList.append(li)
            mdl = mdl.substring(3, mdlcs.length)
            mdlcs = mdl.split("")
        } else {
            if (currentList) {
                mde.append(currentList)
            }
            currentList = null
        }

        //LINKS
        if (mdl.includes("[") == true && mdl.includes("]") == true && mdl.includes("(") == true && mdl.includes(")") == true) {
            let text = mdl.split("[")[1].split("]")[0]
            let link = mdl.split("(")[1].split(")")[0]
            let a = document.createElement("a")
            a.href = link
            a.innerText = text
            let thtb = document.createTextNode(mdl.split("[")[0])
            let thta = document.createTextNode(mdl.split(")")[1])
            textHolder.innerHTML = ""
            textHolder.appendChild(thtb)
            textHolder.append(a)
            textHolder.appendChild(thta)
            mdl = mdl.split("[")[0] + mdl.split(")")[1]
            mdlcs = mdl.split("")
            lineIsLink = true
        }

        //ITALICS
        if (mdlcs[0] == "_" && mdlcs[mdlcs.length - 1] == "_") {
            let i = document.createElement("i")
            mdl = mdl.substring(1, mdlcs.length - 1)
            mdlcs = mdl.split("")
            textHolder.append(i)
            textHolder = i
        }

        if (lineIsLink == false) {
            textHolder.innerText = mdl;
        }
        // console.log(mdl)
        if (addElem) {
            mde.append(addElem)
        }
        if (numofhashes == 2 || numofhashes == 1) {
            mde.appendChild(document.createElement("hr"))
        }
    }
}
