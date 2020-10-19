var resultDataBuffer;
var parser, xmlDoc;

function encrypt(buffer) {
    var encrypters = [172, 115, 254, 242, 170, 186, 109, 171, 48, 58, 139, 167, 222, 13, 21, 33, 74];
    var bytes = new Uint8Array(buffer);
    var output = "";

    for (var i = 0; i < bytes.length; i++) {
        var oldValue = bytes[i];
        var encrypter = encrypters[i % encrypters.length];
        bytes[i] = oldValue ^ encrypter;
        output += String.fromCharCode(bytes[i]);
    }

    resultDataBuffer = buffer;
    return output;
}

$(document).ready(function() {
    $("input[name=file]").change(function() {
        var reader = new FileReader();
		console.log(this.result);
        reader.onload = function() {
			console.log(this.result);
            var result = encrypt(this.result);
            var blob = new Blob([resultDataBuffer], {
                'type': 'application/octet-binary'
            });
            var objectUrl = URL.createObjectURL(blob);
            $('#downloadResult').attr('href', objectUrl);
            var decodee = document.getElementById("decode");
            var down = document.getElementById("downloadResult");
			var down2 = document.getElementById("downloadResult2");
            var edit = document.getElementById("edit");
            var encodee = document.getElementById("encode");
			if(decodee.style.display == "none"){
			    decodee.style.display = "none";
                down.style.display = "none";
			    down2.style.display = "block";
                edit.style.display = "none";
			    $('#downloadResult2').attr('href', objectUrl);
			    $('#downloadResult2').text("CLICK TO DOWNLOAD SAVE FILE!");
			} else {
                decodee.style.display = "none";
                down.style.display = "block";
			    down2.style.display = "none";
                edit.style.display = "block";
			}
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(result.trim(), "application/xml");
            var tablee = document.getElementById("inventory").getElementsByTagName('tbody')[0];
            for (var j = 1; j < 293 * 2; j = j + 2) {
                var cc = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[3].innerHTML;
                var cn = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[1].innerHTML;
                var row = document.createElement("tr")
                row.setAttribute("id", cn);
                tablee.appendChild(row)
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = cn;
                cell2.innerHTML = "<input name='" + cn + "' placeholder='NOW: " + cc + "' class='item' value='" + cc + "'></input>";
            }
        }
        reader.readAsArrayBuffer(this.files[0]);
    });
    $("button[name=changeValues]").click(function() {
        for (var j = 1; j < 293 * 2; j = j + 2) {
            console.log(j / 2 - 0.5);
            var cn = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[1];
            var cc = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[3];
            cc.innerHTML = $("input[name=" + cn.innerHTML + "]").val();
        }
        var encodeable = xmlDoc.documentElement.outerHTML;
        var blob = new Blob([encodeable], {
            'type': 'application/octet-binary'
        });
        var objectUrl = URL.createObjectURL(blob);
        $('#downloadResult').attr('href', objectUrl);
        var decodee = document.getElementById("decode");
        var down = document.getElementById("downloadResult");
		var down2 = document.getElementById("downloadResult2");
        var edit = document.getElementById("edit");
        var encodee = document.getElementById("encode");
        decodee.style.display = "none";
        down.style.display = "block";
		down2.style.display = "block";
        edit.style.display = "none";
        encodee.style.display = "block";
    });
});