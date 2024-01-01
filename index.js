let textAreaContent = null;

String.prototype.InsertString = function(start_, end_, string_)
{
    return this.substring(0, start_) + string_ + this.substring(end_);
}

const OnTextareaChange = function()
{
    textAreaContent.push(document.getElementById("CONTENT_").value);
    if (textAreaContent.length > 2) textAreaContent.shift();
    console.log(textAreaContent);
}

const MakeButtonActive = function(button_)
{
    for(let child of button_.parentElement.children)
    {
        if (child === button_)
        {
            if (button_.classList.contains("ACTIVE_"))
            {
                button_.classList.remove("ACTIVE_");
            }
            else
            {
                button_.classList.add("ACTIVE_");
            }
        }
        else
        {
            child.classList.remove("ACTIVE_")
        }
    }
}
const ClearActiveButton = function(element_)
{
    if (!element_.target.classList.contains("DROPDOWN_BUTTON_"))
    {
        for(let child of document.querySelector("header").children)
        {
            if (child.classList.contains("ACTIVE_"))
            {
                child.classList.remove("ACTIVE_");
            }
        }
    }
}

const NewTextFile = function()
{
    let name = "Unsaved Document.txt";
    document.getElementById("FILE_NAME_FIELD_").value = name;
    document.getElementById("CONTENT_").value = "";
}
const Open = function(file_)
{
    let file = file_.files[0];
    let fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = function()
    {
        document.getElementById("CONTENT_").value = fileReader.result;
        document.getElementById("FILE_NAME_FIELD_").value = file.name;
    }
}
const SaveAS = function()
{
    let text = document.getElementById("CONTENT_").value;
    let blobFile = new Blob([text], {type: "text/plain;charset=utf-8"});
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blobFile);
    link.download = document.getElementById("FILE_NAME_FIELD_").value;
    link.click()
    URL.revokeObjectURL(link.href);
}

const Undo = function()
{
    document.getElementById("CONTENT_").value = textAreaContent[0]
    OnTextareaChange();
}
const Redo = function()
{
    document.getElementById("CONTENT_").value = textAreaContent[1]
    OnTextareaChange();
}
const CopyToClipboard = async function(string_to_copy_)
{
    try
    {
        navigator.clipboard.writeText(string_to_copy_);
    }
    catch (error_)
    {
        console.error(error_)    
    }
}
const Cut = function()
{
    let textArea = document.getElementById("CONTENT_");
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let stringToCopy = textArea.value.substring(start, end);
    CopyToClipboard(stringToCopy);
    textArea.value = textArea.value.InsertString(start, end, '')
    OnTextareaChange();
}
const Copy = function()
{
    let textArea = document.getElementById("CONTENT_");
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    let stringToCopy = textArea.value.substring(start, end);
    CopyToClipboard(stringToCopy);
}
const Past = async function()
{
    try
    {
        let stringToPast = await navigator.clipboard.readText();
        let textArea = document.getElementById("CONTENT_");
        let start = textArea.selectionStart;
        let end = textArea.selectionEnd;
        textArea.value = textArea.value.InsertString(start, end, stringToPast)
        OnTextareaChange();
    }
    catch (error_)
    {
        console.error(error_)    
    }
}
const Delete = function()
{
    let textArea = document.getElementById("CONTENT_");
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    textArea.value = textArea.value.InsertString(start, end, '');
    OnTextareaChange();
}
const SelectAll = function()
{
    let textArea = document.getElementById("CONTENT_");
    textArea.focus();
    textArea.select();
}
const InsertTab = function()
{
    let textArea = document.getElementById("CONTENT_");
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    textArea.value = textArea.value.InsertString(start, end, '\t')
}
const InsertDateandTime = function()
{
    let date = new Date();
    let textArea = document.getElementById("CONTENT_");
    let start = textArea.selectionStart;
    let end = textArea.selectionEnd;
    textArea.value = textArea.value.InsertString(start, end, date)
}

function main()
{
    if('serviceWorker' in navigator)
    {
        navigator.serviceWorker.register('/sw.js', { scope: '/' });
    }
    document.addEventListener("click", ClearActiveButton);
    document.getElementById("CONTENT_").addEventListener("input", OnTextareaChange);
    textAreaContent = ['', ''];
    NewTextFile();
} 