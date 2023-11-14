let state = null
let animation_speed = 300 // in mili seconds
let whowon = null
let tie_counts = 0
let tilesound = new Audio('res/Sounds/tile_sound.ogg')
let winon_prefix = new Audio('res/Sounds/ting.mp3')
let winon = new Audio('/res/Sounds/winon.mp3')
// let tile_x_sound = new Audio('res/Sounds/tile_x_sound.ogg')
let winsound = new Audio('res/Sounds/')
let gridTiles = []
let grid = ["empty","empty","empty","empty","empty","empty","empty","empty","empty"]


let winpatterns = [
    [0,4,8],
    [2,4,6],
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]





let speed = 4
let lastPaintTime = 0
let nextturn = "X"

for (let count=1;count <= 9;count++)
{
    
    gridTiles.push(document.getElementById("gridtile"+count))
    
}

// home = document.getElementById('home')
// home.onclick = function (){
//     window.location.href = '/welcome.html'
// }





function Loadthemes(){
    fetch('./data/themes.json').then(response => response.json()).then(data => {
        console.log(data)
        randombgindex = Math.floor(Math.random() * Object.keys(data).length);
 
        document.body.style.backgroundImage = `url('${data[randombgindex]['themebackground']}')`;
    })
    

}

Loadthemes()




for(let tile=0;tile < Object.keys(gridTiles).length;tile++){
    gridTiles[tile].addEventListener('click',function(){
        CheckForClick(tile)
        
    })
}

document.getElementById('reset').addEventListener('click',function(){
    location.reload()
})

document.getElementById('reset').disabled = true
    





function drawtiles()
{   
    // console.log(gridTiles[0].style)
    for (let i=0;i<Object.keys(grid).length;i++)
    {   
        
        if (grid[i] == "X")
        {   
            
            gridTiles[i].style.background = "url(res/img/X.png)"
            gridTiles[i].style.backgroundRepeat = "no-repeat"
            gridTiles[i].style.backgroundPosition = "center"
            
        }
        else if(grid[i] == "O")
        {
            gridTiles[i].style.background = "url(res/img/O.png)"
            gridTiles[i].style.backgroundRepeat = "no-repeat"
            gridTiles[i].style.backgroundPosition = "center"
            
        }
        else{
            gridTiles[i].style.background = "none"
            

        }
        
    }
    IsWon()
    
}
drawtiles()

function IsWon(){
    
    winpatterns.forEach(e => {
        if(grid[e[0]] == grid[e[1]] && grid[e[0]] == grid[e[2]] && grid[e[0]] != "empty" && grid[e[1]] !="empty" && grid[e[2]] != "empty"){
            
            
            
            document.getElementById('reset').disabled = false
            if(whowon == null){
                if(grid[e[0]] == "X"){
                    whowon = "X"

                }
                else if(whowon == "O"){
                    whowon = "O"
                }
            }
            const heading = document.createElement('h3')
            heading.innerText = 'You Won😊'
            heading.classList.add('won')
            document.body.appendChild(heading)

            const sticker = document.createElement("img");
            sticker.id = 'sticker'
            sticker.src = './res/Anim/excited.gif'
            document.body.appendChild(sticker)
            document.getElementById('grid').style.opacity = 0.1
            // document.getElementById('reset').style.opacity = 1
            winon_prefix.play().then(function(){
                winon.play()
            })
            setInterval(function(){
                if(state == null){
                    gridTiles[e[0]].style.backgroundImage = 'none'
                    gridTiles[e[1]].style.backgroundImage = 'none'
                    gridTiles[e[2]].style.backgroundImage = 'none'
                    state = 'hidden'
                }
                else if(state == 'hidden'){
                    if(whowon == "X"){
                        gridTiles[e[0]].style.backgroundImage = "url(res/img/X.png)"
                        gridTiles[e[1]].style.backgroundImage = "url(res/img/X.png)"
                        gridTiles[e[2]].style.backgroundImage = "url(res/img/X.png)"
                        state = 'seen'
                    }
                    else if(whowon == "O"){
                        gridTiles[e[0]].style.backgroundImage = "url(res/img/O.png)"
                        gridTiles[e[1]].style.backgroundImage = "url(res/img/O.png)"
                        gridTiles[e[2]].style.backgroundImage = "url(res/img/O.png)"
                        state = 'seen'
                    }

                    state = 'seen'
                }
                else if(state == 'seen'){
                    gridTiles[e[0]].style.backgroundImage = 'none'
                    gridTiles[e[1]].style.backgroundImage = 'none'
                    gridTiles[e[2]].style.backgroundImage = 'none'
                    state = 'hidden'
                }

            },animation_speed)

            
            
            
        }
        else{
            if(whowon == null){
                grid.forEach(tl => {
                    if(tl != "empty"){
                        tie_counts = tie_counts+1
                    }
                })
                console.log('tie counts ',tie_counts)
                if(tie_counts == Object.keys(grid).length){
                    // alert('you tie')
                    winon_prefix.play()
    
                    const heading = document.createElement('h3')
                    heading.innerText = 'Draw!😆'
                    heading.classList.add('loose')
                    document.body.appendChild(heading)
    
                    const sticker = document.createElement("img");
                    sticker.id = 'sticker'
                    sticker.src = './res/Anim/tie2.gif'
                    document.body.appendChild(sticker)

                    document.getElementById('game-box').style.opacity = 0.1
                }
                else{
                    tie_counts = 0
                }
            }
            
            
        }


    })


    
        
    

}

function CheckForClick(tileid) 
{   
    if(nextturn == "X")
    {   
        if (grid[tileid] == "empty")
        {
            grid[tileid] = "X"
            console.log("X Drawn")
            nextturn = "O"
            let tilesound = new Audio('res/Sounds/tile_sound.ogg')
            tilesound.play()
        }

    }
    else if(nextturn == "O")
    {
        if (grid[tileid] == "empty")
        {
            grid[tileid] = "O"
            console.log("O Drawn")
            nextturn = "X"
            let tilesound = new Audio('res/Sounds/tile_sound.ogg')
            tilesound.play()
        }
    }
       
    drawtiles()
    
    
}

function ClearGrid()
{
    for(let i=0;i<=Object.keys(grid).length;i++)
    {
        grid[i] = "empty"
    }
    
    drawtiles()
}

