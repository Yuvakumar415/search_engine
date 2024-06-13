let noteslistrootelement= document.querySelector('.noteslist')
let notes=[]
function renderelementstoscreen(){
    if(localStorage.getItem('notes')){
        notes=JSON.parse(localStorage.getItem('notes'))
        notes.forEach(note=>{
            rendernotetolist(note, note.uniqueid)
        })
    }
}
document.querySelector(' #deleteallnotes').addEventListener('click', ()=>{
    document.querySelectorAll('.note').forEach(note=>{
        note.remove()
    })
    localStorage.clear()
})
document.querySelector('#createnotebutton').addEventListener('click',()=>{
    let uniqueid='note'+Math.floor(Math.random()*1000)
    let note={
        title:document.querySelector('#createnotetitle').value,
        content:document.querySelector('#createnotecontent').value


    }
    addnotetolocalstorage(note,uniqueid)
    rendernotetolist(note , uniqueid)
})
function rendernotetolist(note,uniqueid){

    

    let notediv=document.createElement('div')
    notediv.classList.add('note', uniqueid)
    let notetitle= document.createElement('h4')
    let notecontent=document.createElement('p')
    let notedeletebutton=document.createElement('button')

    notetitle.innerText= note.title
    notecontent.innerText=note.content
    notedeletebutton.innerText='delete note'

    notedeletebutton.addEventListener('click', ()=>{
        removeelementsfromnoteslist(uniqueid)
    })


    notediv.appendChild(notetitle)
    notediv.appendChild(notecontent)
    notediv.appendChild(notedeletebutton)

    noteslistrootelement.appendChild(notediv)

    document.querySelector('#createnotetitle').value=''
    document.querySelector('#createnotecontent').value=''

    
}

function addnotetolocalstorage(note, uniqueid){
    note={...note, uniqueid}
    notes.push(note)
    localStorage.setItem('notes' , JSON.stringify(notes))
}

function removeelementsfromnoteslist(id){
    console.log(id)
    
    document.querySelector('.'+id).remove()
    notes=JSON.parse(localStorage.getItem('notes'))
    let index= notes.findIndex(note=> note.uniqueid==id)
    notes.splice(index ,1)
    localStorage.setItem('notes',JSON.stringify(notes)) 
}


renderelementstoscreen()

