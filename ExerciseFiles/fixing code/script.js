"use strict";

$(window).on("load", documentLoaded);

function documentLoaded() {
    // load json-structure
    console.log("loaded");
    $.getJSON("structure.json", structureLoaded);
}

/* Naming:
    - structure: a tree of objects describing the correct structure
    - desc: a descriptor node in the structure tree
    - html: a parsed html DOM node tree
    - node: a node in the html tree
    - curNode: the current node while traversing the HTML tree
*/

let structure = "";

let html = null;
let curNode = null;


function structureLoaded(data) {
    structure = data.structure;

    // Add parent-elements
    let prev = null;
    structure.forEach(desc => {
        addParentTo(desc, null);
        if (prev != null) {
            prev.nextSibling = desc;
        }
        prev = desc;
    });

    displayStructure();

    // TODO: Display required structure as li's...
    //       - make it possible to display checkmarks vs errors ...

    $("#submit").on("click", parseHTML);
}

function addParentTo(descriptor, parent) {
    descriptor.parent = parent;

    if (descriptor.children != undefined) {
        let prevSibling = null;
        descriptor.children.forEach(child => {
            addParentTo(child, descriptor);
            if (prevSibling != null) {
                prevSibling.nextSibling = child;
            }
            prevSibling = child;
        });
    }
}

function displayStructure() {
    // clear existing structure
    document.querySelector("#structuredisplay").innerHTML = "";

    let ul = document.createElement("ul");

    structure.forEach(desc => ul.appendChild(createDescriptorDisplay(desc)));

    document.querySelector("#structuredisplay").appendChild(ul);
}

function createDescriptorDisplay(descriptor) {
    // create li for this descriptor
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.classList.add("descriptor");

    // build name
    let name = "";
    if (descriptor.tag != "div") {
        name += descriptor.tag;
    }
    if (descriptor.alternative != undefined) {
        name += "(" + descriptor.alternative + ")";
    }

    if (descriptor.hasOwnProperty("id")) {
        name += "#" + descriptor.id;
    }
    // TODO: Check if .class is a problematic name!
    if (descriptor.hasOwnProperty("class")) {
        name += "." + descriptor.class;
    }

    span.appendChild(document.createTextNode(name));
    li.appendChild(span);

    // if descriptor element has children, create a sublist for them
    if (descriptor.children != null) {
        let ul = document.createElement("ul");

        descriptor.children.forEach(child => ul.appendChild(createDescriptorDisplay(child)));

        li.appendChild(ul);
    }

    // add the span-element to the descriptor (that is the one that should be styled - li will always be parent)
    descriptor.domElement = span;

    return li;
}


function parseHTML() {
    console.log("Parse away!");
    let str = $("#htmltext").val();
    html = $.parseHTML(str);

    // Start checking structure
    checkStructure();
}

let firstmatchfound = false;

function checkStructure() {
    // reset display
    document.querySelectorAll("#structuredisplay .descriptor").forEach(span => {
        span.classList.remove("match");
        span.classList.remove("no-match");
        span.parentElement.classList.remove("no-match")
    });


    // reset cur
    curNode = html[0];

    // reset firstmatch
    firstmatchfound = false;

    // check entire structure - one child at a time, deep-left
    structure.forEach(desc => checkSubStructure(desc));

    console.log("DONE CHECKING!")
}

/* checks part of the tree, with the given desc as root.
   matches the current part of the HTML, expecting curNodes' parent as root.
   curNode is modified - can be expected to be a sibling of curNode. */
function checkSubStructure(rootDesc) {

    let match = false;
    let extraInserted = false;
    let missingElement = false;

    // compare rootDesc and curNode - nextSibling curNode until a match is found
    while (!match && curNode != null) {
        // TODO: Test if last node is checked!
        if (compareTag(rootDesc, curNode)) {
            console.log("Match between %o and %o", rootDesc, curNode);
            firstmatchfound = true;
            match = true;
        } else {
            // if first match has been found - check if required element is missing!
            if (firstmatchfound) {
                console.log("something wrong after first!");
                // ekstra element inserted ...
                if (curNode.nextElementSibling != null && compareTag(rootDesc, curNode.nextElementSibling)) {
                    console.log("Extra element inserted between required");
                    extraInserted = true;
                }
                else
                    // an element might be missing - check if this one matches the next descriptor
                    if (rootDesc.nextSibling != null && compareTag(rootDesc.nextSibling, curNode)) {
                        missingElement = true;
                        console.log("Required element missing: ", rootDesc);
                        break;
                    }
                    else {
                        // TODO: Figure out what this is! . might be multiple extranous elements ...
                        console.log("Something else...");
                        curNode = curNode.nextElementSibling;
                    }
            }

            if (!firstmatchfound || extraInserted) {
                curNode = curNode.nextElementSibling;
            }
        }
    }

    if (!match) {
        // FIX: If HTML is missing required element - but has the next one, we will never know
        console.log("Never found match for %o", rootDesc);
        // Mark as incorrect
        markAsIncorrect(rootDesc);

    } else {
        //  Mark as correct
        markAsCorrect(rootDesc);
        // Correct!
        // if rootDesc has children, check those
        if (rootDesc.children != undefined) {
            let lastNode = curNode;
            curNode = curNode.firstElementChild;
            rootDesc.children.forEach(desc => checkSubStructure(desc));
            curNode = lastNode;
        }

        // finally, move curNode to the nextSibling
        //    curNode = curNode.nextElementSibling;
    }

    if (match) {
        curNode = curNode.nextElementSibling;
    }

}

function markAsIncorrect(desc) {
    desc.domElement.classList.add("no-match");
    desc.domElement.parentElement.classList.add("no-match");
}

function markAsCorrect(desc) {
    desc.domElement.classList.add("match");
}

function compareTag(desc, node) {
    let compares = false;

    // compare tagname
    if (node.nodeName.toLowerCase() == desc.tag.toLowerCase() ||
        (desc.alternative != undefined && node.nodeName.toLowerCase() == desc.alternative.toLowerCase())) {
        compares = true;

        // for now, everything is okay - but test id and tag
        if (desc.hasOwnProperty("id") && node.id != desc.id) {
            compares = false;
        }

        if (desc.hasOwnProperty("class") && !node.classList.contains(desc.class)) {
            compares = false;
        }
    }


    return compares;

}