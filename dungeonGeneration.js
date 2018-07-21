let start = new StartPoint();
let end = new EndPoint();

dungeonGeneration = (()=>{
    let objects = [];
    function generateCave(dungeonDifficulty) {
        objects = [mainHero];
        let dungeonHeight = Math.floor((1+Math.random())*30);
        let dungeonWidth =Math.floor((1+Math.random())*50);
        console.log(dungeonHeight, dungeonWidth);




        let map = new Array(dungeonHeight);
        for (let i = 0; i < dungeonHeight; i++) {
            map[i] = new Array(dungeonWidth);
        }

        for (let i = 0; i < dungeonHeight; i++)
            for (let j = 0; j < dungeonWidth; j++)
                map[i][j] = new Wall();

        let startX = Math.floor(Math.random() * (dungeonWidth-2))+1;
        let startY = Math.floor(Math.random() * (dungeonHeight-2))+1;
        let exitX = 0;
        let exitY = 0;
        let maxFloorTiles = dungeonHeight*dungeonWidth / 10;
        let floorTilesCount = 0;

        map[startY][startX] = start;


        for (let i = 0; i < 4; i++) {
            let currentX = startX;
            let currentY = startY;
            floorTilesCount = 0;
            while (floorTilesCount < maxFloorTiles) {

                let direction = Math.floor(Math.random() * 4);

                switch (direction) {
                    case 0:
                        if (currentX - 2 >= 0) {
                            currentX--;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 1:
                        if (currentX + 2 < dungeonWidth) {
                            currentX++;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 2:
                        if (currentY - 2 >= 0) {
                            currentY--;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                    case 3:
                        if (currentY + 2 < dungeonHeight) {
                            currentY++;
                            if (!(map[currentY][currentX] instanceof Floor) && !(map[currentY][currentX] instanceof StartPoint)) {
                                map[currentY][currentX] = new Floor();
                                floorTilesCount++;
                            }
                        }
                        break;
                }
            }
            if (i === 3){
                exitX = currentX;
                exitY = currentY;
            }
        }

        map[exitY][exitX] = end;

        function addEnemy(count){
            let enemyCount = 0;
            while (enemyCount < count){
                let tryX = Math.floor(Math.random() * (dungeonWidth - 2))+1;
                let tryY = Math.floor(Math.random() * (dungeonHeight - 2))+1;
                if (map[tryY][tryX] instanceof Floor){
                    objects.push(new Orc(tryX,tryY));
                    enemyCount++;
                    console.log(objects);
                }
            }
        }
        addEnemy(Math.floor(depth * (1 + dungeonDifficulty * Math.random()) * Math.floor(Math.random()* 5) + 1));
        return [map,startX,startY];
    }


    function generateObjects() {
        //first object is personage
        return objects;
    }
    return {
        generateCave: generateCave,
        generateObjects: generateObjects
    }
})();
