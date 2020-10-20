/*
 * SHELTERED SAVE EDITOR
 * File Name: js.js
 * Version: 1.1
 * Author: Emre Cebeci
 * GitHub: https://github.com/emreyigitcbc/
 */

// Declare global variables
var resultDataBuffer;
var parser, xmlDoc;

$(document).ready(function() {
    welcome_page = document.getElementById("welcome-page");
    upload_page = document.getElementById("upload-page");
    editor_page = document.getElementById("editor-page");
    download_page = document.getElementById("download-page");

    nav_first = document.getElementById("nav-first");
    nav_second = document.getElementById("nav-second");
    nav_third = document.getElementById("nav-third");
    nav_fourth = document.getElementById("nav-fourth");
    nav_pos = document.getElementById("nav-pos");

    info_box = document.getElementById("status");

    editor_nav = document.getElementById("editor-nav");

    editor_inv = document.getElementById("inventory-editor");
    editor_ply = document.getElementById("player-editor");
    editor_wrl = document.getElementById("world-editor");

    editor_wrl_table = document.getElementById("editor-wrl-table");
    editor_inv_table = document.getElementById("editor-inv-table");
    editor_ply_selector = document.getElementById("player-selector");

    download_button = $("a[name=download-button]");
    save_changes = $("button[name=save-changes]");
    file_encrypted = $("p#file-encrypted");
});
// Page swapping function. pn : page number
function swapPage(pn) {
    if (pn == 0) {
        welcome_page.style.display = "block";
        upload_page.style.display = "none";
        editor_page.style.display = "none";
        download_page.style.display = "none";

        nav_pos.innerHTML = "Position: Welcome Page";
    } else if (pn == 1) {
        welcome_page.style.display = "none";
        upload_page.style.display = "block";
        editor_page.style.display = "none";
        download_page.style.display = "none";

        nav_pos.innerHTML = "Position: Upload Page";
    } else if (pn == 2) {
        welcome_page.style.display = "none";
        upload_page.style.display = "none";
        editor_page.style.display = "block";
        download_page.style.display = "none";

        nav_pos.innerHTML = "Position: Editor Page";
    } else if (pn == 3) {
        welcome_page.style.display = "none";
        upload_page.style.display = "none";
        editor_page.style.display = "none";
        download_page.style.display = "block";

        nav_pos.innerHTML = "Position: Download Page";
    }

    // Editor Page Swaps
    if (pn == 10) {
        editor_inv.style.display = "block";
        editor_ply.style.display = "none";
        editor_wrl.style.display = "none";
    } else if (pn == 11) {
        editor_inv.style.display = "none";
        editor_ply.style.display = "block";
        editor_wrl.style.display = "none";
    } else if (pn == 12) {
        editor_inv.style.display = "none";
        editor_ply.style.display = "none";
        editor_wrl.style.display = "block";
    }

    // Player Selector Tab Swaps
    if (pn == 500) {
        $("#ply-0").show();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 501) {
        $("#ply-0").hide();
        $("#ply-1").show();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 502) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").show();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 503) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").show();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 504) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").show();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 505) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").show();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 506) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").show();
        $("#ply-7").hide();
        $("#ply-8").hide();
    } else if (pn == 507) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").show();
        $("#ply-8").hide();
    } else if (pn == 508) {
        $("#ply-0").hide();
        $("#ply-1").hide();
        $("#ply-2").hide();
        $("#ply-3").hide();
        $("#ply-4").hide();
        $("#ply-5").hide();
        $("#ply-6").hide();
        $("#ply-7").hide();
        $("#ply-8").show();
    }
}

function resetTables() {
    // PLAYER
    $("#ply-0").remove();
    $("#ply-1").remove();
    $("#ply-2").remove();
    $("#ply-3").remove();
    $("#ply-4").remove();
    $("#ply-5").remove();
    $("#ply-6").remove();
    $("#ply-7").remove();
    $("#ply-8").remove();
    $("#player-selector").empty();
    // INV AND SAVE INFO
    var inv = $("#editor-inv-table");
    var si = $("#editor-wrl-table");
    inv.empty();
    si.empty();
    var invrow = document.createElement("tr");
    var invth1 = document.createElement("th");
    var invth2 = document.createElement("th");
    var invth3 = document.createElement("th");

    invth1.innerHTML = "Item Name";
    invth2.innerHTML = "Item ID";
    invth3.innerHTML = "Item Count";

    invrow.appendChild(invth1);
    invrow.appendChild(invth2);
    invrow.appendChild(invth3);
    inv.append(invrow);

    var sirow = document.createElement("tr");
    var sith1 = document.createElement("th");
    var sith2 = document.createElement("th");

    sith1.innerHTML = "Option";
    sith2.innerHTML = "Option value";

    sirow.appendChild(sith1);
    sirow.appendChild(sith2);
    si.append(sirow);
    console.log("TABLES RESETTED!");
}

// Encrypt/decrypt file function.
// Found on: https://steamcommunity.com/sharedfiles/filedetails/?id=911776607
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
    // On file upload, read file as array buffer, decrypt and create editor tables.
    $("input[name=upload-file]").change(function() {
        resetTables();
        var reader = new FileReader();
        reader.onload = function() {
            var result = encrypt(this.result);
            var blob = new Blob([resultDataBuffer], {
                'type': 'application/octet-binary'
            });
            var objectUrl = URL.createObjectURL(blob);
            download_button.attr('href', objectUrl);
            download_button.attr("download", "savedata_01.dat");
            swapPage(2);
            nav_second.style.display = "block";
            nav_third.style.display = "block";
            nav_fourth.style.display = "block";
            // Table Creating
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(result.trim(), "application/xml");
            // Check if valid file.
            if ($(xmlDoc).find("parsererror").children().length > 0) {
                nav_second.style.display = "block";
                nav_third.style.display = "none";
                nav_fourth.style.display = "none";
                editor_wrl.style.display = "none";
                editor_inv.style.display = "none";
                editor_ply.style.display = "none";
                editor_nav.style.display = "none";
                save_changes.hide();
                info_box.innerHTML = "Please upload valid file.";
                xmlDocTry = parser.parseFromString(encrypt(resultDataBuffer), "application/xml");
                if ($(xmlDocTry).find("root").children().length > 1) {
                    swapPage(3);
                    file_encrypted.show();
                    download_button.show();
                    download_button.html("Download (CRYPTED)");
                }
            } else {
                info_box.innerHTML = "File is valid. Please start editing table down below or you can download file and manually edit.";
                nav_second.style.display = "block";
                nav_third.style.display = "block";
                nav_fourth.style.display = "block";
                editor_wrl.style.display = "none";
                editor_inv.style.display = "none";
                editor_ply.style.display = "block";
                editor_nav.style.display = "block";
                download_button.show();
                save_changes.show();
                download_button.html("Download (ENCRYPTED)");
            }

            // Inventory Table
            // Multiplying by 2 because every one of two index is space.
            var item_names = JSON.parse(name_list);
            for (var j = 1; j < 293 * 2; j = j + 2) {
                var cc = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[3].innerHTML;
                var cn = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[1].innerHTML;
                var row = document.createElement("tr")
                row.setAttribute("id", cn);
                editor_inv_table.appendChild(row)
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = item_names[cn];
                cell3.innerHTML = "<input name='" + cn + "' placeholder='NOW: " + cc + "' class='item' value='" + cc + "'></input>";
                cell2.innerHTML = cn;
            }
            // Player Table
            var player_count = xmlDoc.getElementsByTagName("FamilyMembers")[0].childElementCount;
            // These wont be added on table. I will try to make editable these.
            var banned = ["transform", "CharacterMesh", "hairColor", "skinColor", "skinColor", "pantsColor", "ladderStart",
                "ladderExit", "pathTarget", "BaseStats", "Traits", "last_damage_extra", "originalHairColor", "originalShirtColor", "originalPantsColor",
                "AI_JobQueue", "Player_JobQueue", "FamilyAI", "BehaviourStats", "Illnesses", "memberID", "Psycho", "Interruptions",
                "unconsciousLocation", "shirtColor"
            ];
            for (var xx = 1; xx < player_count * 2; xx = xx + 2) {
                // Create player page div
                var player_div = document.createElement("div");
                player_div.setAttribute("id", "ply-" + ((xx - 1) / 2));
                editor_ply.appendChild(player_div);
                if (xx == 1) {
                    player_div.style.display = "block";
                } else {
                    player_div.style.display = "none";
                }
                // Player selector button creating
                var player_list_item = document.createElement("button");
                player_list_item.innerHTML = (xx - 1) / 2 + 1;
                player_list_item.setAttribute("class", "btn btn-danger m-2");
                player_list_item.setAttribute("onclick", "swapPage(" + ((xx - 1) / 2 + 500) + ");");
                editor_ply_selector.appendChild(player_list_item);
                // Creating player table
                var player_gen_table = document.createElement("table");
                player_gen_table.setAttribute("class", "table table-dark");
                player_gen_table.setAttribute("id", "" + xx);
                player_div.appendChild(player_gen_table);
                for (var jj = 1; jj < xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childElementCount; jj = jj + 2) {
                    // Filling table with data
                    if (!banned.includes(xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].nodeName)) {
                        var cc = xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].innerHTML;
                        var cn = xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].nodeName;
                        var row = document.createElement("tr")
                        row.setAttribute("id", cn);
                        player_gen_table.appendChild(row)
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = cn;
                        cell2.innerHTML = "<input name='" + ((xx - 1) / 2) + "-" + cn + "' placeholder='NOW: " + cc + "' class='item' value='" + cc + "'></input>";
                    }
                }
            }
            // Save Info table
            var info_count = xmlDoc.getElementsByTagName("SaveInfo")[0].childElementCount;
            for (var xx = 1; xx < info_count * 2; xx = xx + 2) {
                var cc = xmlDoc.getElementsByTagName("SaveInfo")[0].childNodes[xx].nodeName;
                var cn = xmlDoc.getElementsByTagName("SaveInfo")[0].childNodes[xx].innerHTML;
                var row = document.createElement("tr")
                editor_wrl_table.appendChild(row)
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = cc;
                cell2.innerHTML = "<input name='si-" + cc + "' placeholder='NOW: " + cn + "' class='item' value='" + cn + "'></input>";
            }

            // SAVE CHANGES and CREATE FILE
            $("button[name=save-changes]").click(function() {
                // Saving Inventory Table and changing inputs' placeholder with new values.
                for (var j = 1; j < 293 * 2; j = j + 2) {
                    console.log("Saved INV: " + (j / 2 - 0.5));
                    var cn = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[1];
                    var cc = xmlDoc.getElementsByTagName("InventoryManager")[0].childNodes[5].childNodes[j].childNodes[3];
                    $("input[name=" + cn.innerHTML + "]").attr('placeholder', "NOW: " + $("input[name=" + cn.innerHTML + "]").val());
                    cc.innerHTML = $("input[name=" + cn.innerHTML + "]").val();
                }
                // Saving player table and changing inputs' placeholder with new values.
                var player_count = xmlDoc.getElementsByTagName("FamilyMembers")[0].childElementCount;
                var banned = ["transform", "CharacterMesh", "hairColor", "skinColor", "skinColor", "pantsColor", "ladderStart",
                    "ladderExit", "pathTarget", "BaseStats", "Traits", "last_damage_extra", "originalHairColor", "originalShirtColor", "originalPantsColor",
                    "AI_JobQueue", "Player_JobQueue", "FamilyAI", "BehaviourStats", "Illnesses", "memberID", "Psycho", "Interruptions",
                    "unconsciousLocation", "shirtColor"
                ];
                for (var xx = 1; xx < player_count * 2; xx = xx + 2) {
                    for (var jj = 1; jj < xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childElementCount; jj = jj + 2) {
                        if (!banned.includes(xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].nodeName)) {
                            console.log("Saved PLY: " + ((xx - 1) / 2) + "-" + ((jj - 1) / 2));
                            nn = xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].nodeName;
                            xmlDoc.getElementsByTagName("FamilyMembers")[0].childNodes[xx].childNodes[jj].innerHTML = $("input[name=" + ((xx - 1) / 2) + "-" + nn + "]").val();
                            $("input[name=" + ((xx - 1) / 2) + "-" + nn + "]").attr('placeholder', "NOW: " + $("input[name=" + ((xx - 1) / 2) + "-" + nn + "]").val());
                        }
                    }
                }
                // Saving Save Info table
                var info_count = xmlDoc.getElementsByTagName("SaveInfo")[0].childElementCount;
                for (var xx = 1; xx < info_count * 2; xx = xx + 2) {
                    console.log("Saved INF: " + ((xx - 1) / 2))
                    var cc = xmlDoc.getElementsByTagName("SaveInfo")[0].childNodes[xx].nodeName;
                    var cn = xmlDoc.getElementsByTagName("SaveInfo")[0].childNodes[xx].innerHTML;
                    xmlDoc.getElementsByTagName("SaveInfo")[0].childNodes[xx].innerHTML = $("input[name=si-" + cc + "]").val();
                    $("input[name=si-" + cc + "]").attr('placeholder', "NOW: " + $("input[name=si-" + cc + "]").val());
                }

                // Creating new blob object to read as array buffer with FileReader. I tried TextDecoder but it is not working...
                var encodeable = xmlDoc.documentElement.outerHTML;
                var blob_save = new Blob([encodeable], {
                    'type': 'application/octet-binary'
                });
                // It reads blob_save object as ArrayBuffer and encrypts and makes new and final blob object.
                var saver = new FileReader();
                saver.onload = function() {
                    var result = encrypt(this.result);
                    var blob_real_save = new Blob([resultDataBuffer], {
                        'type': 'application/octet-binary'
                    });
                    var objectUrl = URL.createObjectURL(blob_real_save);
                    download_button.attr("download", "savedata_01.dat");
                    download_button.html("Download (CRYPTED)");
                    download_button.attr("href", objectUrl);
                }
                saver.readAsArrayBuffer(blob_save);

                alert("Changes succesfully saved. You can download or continue editing.");
            });
        }
        reader.readAsArrayBuffer(this.files[0]);
    });
});