function SplitText(node)
{
    var text = node.innerText ? node.innerText : node.textContent ? node.textContent : "";
    if (text == ""){
        alert(text);
        return;
    }

    text = text.replace(/^\s*|\s(?=\s)|\s*$/g, "");

    for(var i = 0; i < text.length; i++)
    {
        var letter = document.createElement("span");
        letter.style.display = "inline-block";
        letter.style.position = "absolute";
        letter.appendChild(document.createTextNode(text.charAt(i)));
        node.parentNode.insertBefore(letter, node);

        var positionRatio = i / (text.length - 1);
        var textWidth = letter.clientWidth;



        var indent = 100 * positionRatio;
        var offset = -textWidth * positionRatio;
        letter.style.left = indent + "%";
        letter.style.marginLeft = offset + "px";

        console.log("Letter ", text[i], ", Index ", i, ", Width ", textWidth, ", Indent ", indent, ", Offset ", offset);
    }

    node.parentNode.removeChild(node);
}

function Justify()
{
    var TEXT_NODE = 1;
    var elem = $(".justify");
    elem = elem[0].firstChild;

    while(elem)
    {
        var nextElem = elem.nextSibling;

        if(elem.nodeType == TEXT_NODE)
            SplitText(elem);

        elem = nextElem;
    }
}
