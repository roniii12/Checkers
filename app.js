/*function createTableCheckers(countOfRow) {
    createTableStart(countOfRow);
    createRows(countOfRow);
    for (let row = 1; row < countOfRow / 2; row++) {
        createSoliderDark(row);
    }
    for (let row = countOfRow / 2 + 2; row < countOfRow + 1; row++) {
        createSoliderBright(row)
    }
}
createTableStart = function (countOfRow) {
    let table = document.getElementById("checker");
    if (table != null)
       this.table.remove();
   this.table = document.createElement("table");
   this.table.setAttribute("id", "checker");
    document.body.appendChild(table);
}

createRows = function (countOfRow) {
    for (let i = 0; i < countOfRow; i++) {
        let createRow = document.createElement("tr");
        document.querySelector("table").appendChild(createRow)
        if (i % 2 === 0)
            createColumnsStartBirght(i + 1, countOfRow);
        else
            createColumnsStartDark(i + 1, countOfRow);
    }

}

createColumnsStartBirght = function (rowNumber, countOfColumn) {
    for (let i = 0; i < countOfColumn; i++) {
        let column = document.createElement("td");
        setAttributeOfColumn(column, rowNumber, i);
        column.setAttribute("name", "" + rowNumber + i);
        let link = document.createElement("a");
        if (i % 2 === 0) {
            document.querySelector('tr:nth-child(' + rowNumber + ')')
                .appendChild(column);
        } else
            document.querySelector('tr:nth-child(' + rowNumber + ')')
            .appendChild(column).className = "dark";
    }
}

createColumnsStartDark = function (rowNumber, countOfColumn) {
    for (let i = 0; i < countOfColumn; i++) {
        let column = document.createElement("td");
        setAttributeOfColumn(column, rowNumber, i);
        if (i % 2 !== 0)
            document.querySelector('tr:nth-child(' + rowNumber + ')')
            .appendChild(column).className = "bright";
        else
            document.querySelector('tr:nth-child(' + rowNumber + ')')
            .appendChild(column).className = "dark";
    }
}
createSoliderBright = function (rowNumber) {
    let columns = document.querySelectorAll('tr:nth-child(' + rowNumber + ') > td.dark')
    columns.forEach(column => {
        let solider = document.createElement("div");
        solider.className = "brightCharacter";
        column.appendChild(solider);
    });
}
createSoliderDark = function (rowNumber) {
    let columns = document.querySelectorAll('tr:nth-child(' + rowNumber + ') > td.dark')
    columns.forEach(column => {
        let solider = document.createElement("div");
        solider.className = "darkCharacter";
        column.appendChild(solider);
    });
}
setAttributeOfColumn = function (columnElement, rowNumber, columnNumber) {
    columnElement.setAttribute("id", "" + rowNumber + columnNumber);
    columnElement.addEventListener("click", () => {
        let detail = new getDetailsLocationClick;
        detail.Location = columnElement.getAttribute("id");
        detail.isSolider = columnElement.hasChildNodes();
        if (detail.isSolider == true) {
            detail.typeSolider = columnElement.firstChild.getAttribute("class");
            console.log(detail.typeSolider);
        }
        if (detail.detailsSteps.length > 0) {
            if (detail.isSolider == true) {
                if (detail.typeSolider.includes(getTurnPlayer)) {
                    detail.detailsSteps.length = 0;
                }
            } else {
                if (isMove(detail)) {
                    detail.detailsSteps.push(detail.Location);
                }
            }
        }
        if (detail.detailsSteps.length == 0 && detail.isSolider == true) {
            if (detail.typeSolider.includes(getTurnPlayer)) {
                detail.detailsSteps.push(detail.Location);
            }
        }
        console.log(detail.detailsSteps);
    });
}
isMove = function (detail) {
    let remainder = Number(detail.Location) - Number(detail.detailsSteps[detail.detailsSteps.length - 1]);
    let remainderAbs = Math.abs(remainder);
    if (remainderAbs == 11 || remainderAbs == 22 || remainderAbs == 9 || remainderAbs == 18) {
        if (isEat(remainderAbs, remainder, detail))
            return true;
        if (remainderAbs == 11 || remainderAbs == 9) {
            let columnElement = document.getElementById(detail.Location);
            if (!columnElement.hasChildNodes())
                //detail.detailsSteps.push(detail.Location);
                return true;
        }
    }
}
isEat = function (remainderAbs, remainder, detail) {
    if (remainderAbs == 22) {
        let columnBetween = document.getElementById(Number(detail.Location) - (remainder > 0 ? -11 : 11));
        if (columnBetween.hasChildNodes()) {
            if (!(columnBetween.firstChild.getAttribute("class").includes(getTurnPlayer))) {
                return true;
            }
        }
    } else if (remainderAbs == 18) {
        let columnBetween = document.getElementById(Number(detail.Location) - (remainder > 0 ? -9 : 9));
        if (columnBetween.hasChildNodes()) {
            if (!(columnBetween.firstChild.getAttribute("class").includes(getTurnPlayer))) {
                return true;
            }
        }
    }
}

function getDetailsLocationClick() {
    Location = "",
        isSolider = "",
        typeSolider = ""
}
getDetailsLocationClick.prototype = {
    detailsSteps: []
};
var getTurnPlayer = "bright";


*/





var Game = {
    numbersOfRow: 0
}
Game.prototype = {
    constructor: CheckersGame(this.numbersOfRow)
}

function CheckersGame(numbersOfRow) {
    this.table = [];
    this.darkSolider = 1;
    this.brightSolider = 2;
    this.darkKing = 3;
    this.brightKing = 4;
    this.empty = 0;
    this.locations = [];
    this.isTurnBright = true;
    this.elements = [];
    this.update = {
        location: this.locations,
        locationDelete: {
            row: [],
            column: []
        },
        isTurnBright: this.isTurnBright,
        prototype: {
            burn: false
        }
    }
    //this.update.table = this.clone(this.table);
    this.createTable = function () {
        for (let row = 0; row < numbersOfRow; row++) {
            this.table[row] = [];
            for (let column = 0; column < numbersOfRow; column++) {
                if (row < (numbersOfRow / 2 - 1))
                    this.insertSoliderStart(this.darkSolider, row, column);
                else if (row > numbersOfRow / 2)
                    this.insertSoliderStart(this.brightSolider, row, column);
                else
                    this.table[row][column] = this.empty;
            }
        }
    }

    this.insertSoliderStart = function (typeSolider, row, column) {
        if (row % 2 === 0 && column % 2 === 1)
            this.table[row][column] = (typeSolider);
        else if (row % 2 === 1 && column % 2 === 0)
            this.table[row][column] = (typeSolider);
        else
            this.table[row][column] = this.empty;
    }
    this.setInitLocations = function (location) {
        let detailsLocation = returnRowAndColumn(location);
        console.log(detailsLocation);
        if ((this.table[detailsLocation.row][detailsLocation.column] == (this.isTurnBright ? this.brightSolider : this.darkSolider) ||
                this.table[detailsLocation.row][detailsLocation.column] == (this.isTurnBright ? this.brightKing : this.darkKing)) &&
            this.locations.length < 2) {
            this.locations = [location];
        } else if (this.locations.length == 1) {
            return false;
        }
        return true;
        //console.log(location);
    }
    this.setElements = function (element) {
        if (this.locations.length > 0) {
            element.className += " selected";
        }
        if (this.elements.length == 0) {
            this.elements[0] = element;
        } else
            this.elements[1] = element;
        if (this.elements.length > 1) {
            this.elements[0].className = this.elements[0].className.replace("selected", "");
        }
    }

    this.isLegalMove = function (targetLocation) {
        let lastLocation = this.locations.length - 1;
        let from = returnRowAndColumn(this.locations[lastLocation]);
        let target = returnRowAndColumn(targetLocation);
        let remainderRow = target.row - from.row;
        if (remainderRow == 1 && this.isTurnBright && this.table[from.row][from.column] != this.brightKing)
            return false;
        else if (remainderRow == -1 && !this.isTurnBright && this.table[from.row][from.column] != this.darkKing)
            return false;
        else if (remainderRow == 0)
            return false;
        if (this.locations.length > 0)
            return this.isMove(from, target);
    }
    this.isLegalMoveFromToTarget = function (from, target) {
        let remainderRow = target.row - from.row;
        if (remainderRow == 1 && this.isTurnBright && this.table[from.row][from.column] != this.brightKing)
            return false;
        else if (remainderRow == -1 && !this.isTurnBright && this.table[from.row][from.column] != this.darkKing)
            return false;
        else if (remainderRow == 0)
            return false;
        if (this.locations.length > 0)
            return this.isMove(from, target);
    }
    this.isMove = function (from, target) {
        let remainderRow = Number(target.row) - Number(from.row);
        let remainderColumn = Number(target.column) - Number(from.column);
        let remainderRowAbs = Math.abs(remainderRow);
        let remainderColumnAbs = Math.abs(remainderColumn);
        if (remainderRowAbs == 1 && remainderColumnAbs == 1) {
            if (!this.isCharacterPosition(target.row, target.column)) {
                this.update.location = [];
                return true;
            }
        } else if (remainderRowAbs == 2 && remainderColumnAbs == 2) {
            if (!this.isCharacterPosition(target.row, target.column) && this.isEat(remainderRow, remainderColumn, target)) {
                this.update.location.push(target.row + "/" + target.column);
                return true;
            } else if (this.table[from.row][from.column] > 2 && this.isMoveKing(from, target)) {
                return true;
            }
        } else if (remainderRowAbs > 2 && remainderColumnAbs > 2 && this.table[from.row][from.column] > 2 && remainderRowAbs == remainderColumnAbs) {
            if (!this.isCharacterPosition(target.row, target.column) && this.isMoveKing(from, target)) {
                this.update.location.push(target.row + "/" + target.column);
                return true;
            }
        }
    }
    this.isMoveKing = function (from, target) {
        if (!this.isCharacterPosition(target.row, target.column)) {
            let remainderRow = Number(target.row) - Number(from.row);
            let remainderColumn = Number(target.column) - Number(from.column);
            let remainderRowAbs = Math.abs(remainderRow);
            let remainderColumnAbs = Math.abs(remainderColumn);
            if (remainderRowAbs == remainderColumnAbs) {
                if (this.isEatKing(remainderRow, remainderColumn, target))
                    return true;
                return this.isMoveKingWithoutEat(from, target);
            }
        }
        return false;
    }
    this.isMoveKingWithoutEat = function (from, target) {
        let column = from.column;
        let addToColumnEveryRow = target.column > from.column ? 1 : -1;
        for (let row = from.row + 1; row <= target.row; row++) {
            column += addToColumnEveryRow;
            if (this.isCharacterPosition(row, column))
                return false;
        }
        column = from.column
        for (let row = from.row - 1; row >= target.row; row--) {
            column += addToColumnEveryRow;
            if (this.isCharacterPosition(row, column))
                return false;
        }
        return true;
    }
    this.isEat = function (remainderRow, remainderColumn, target) {
        if (Math.abs(remainderRow) == 2) {
            let rowBetween = target.row - (remainderRow > 0 ? 1 : -1);
            let columnBetween = target.column - (remainderColumn > 0 ? 1 : -1);
            if (this.isVsPlayer(rowBetween, columnBetween)) {
                this.update.locationDelete.row.push(rowBetween)
                this.update.locationDelete.column.push(columnBetween)
                return true;
            }
        } else if (Math.abs(remainderRow) >= 2) {
            this.isEatKing(remainderRow, remainderColumn, target);
        }
        return false;
    }
    this.isEatKing = function (remainderRow, remainderColumn, target) {
        if (Math.abs(remainderRow) >= 2) {
            let remainder = 1;
            let rowBetween = target.row - (remainderRow > 0 ? remainder : -remainder);
            let columnBetween = target.column - (remainderColumn > 0 ? remainder : -remainder);
            do {
                rowBetween = target.row - (remainderRow > 0 ? remainder : -remainder);
                columnBetween = target.column - (remainderColumn > 0 ? remainder : -remainder);
                if (this.isVsPlayer(rowBetween, columnBetween)) {
                    if (Math.abs(rowBetween - this.update.locationDelete.row[this.update.locationDelete.row.length - 1]) != 1) {
                        this.update.locationDelete.row.push(rowBetween)
                        this.update.locationDelete.column.push(columnBetween)
                    } else {
                        return false;
                    }
                } else if (this.isMyPlayer(rowBetween, columnBetween)) {
                    return false;
                }
                remainder++;
            } while (Math.abs(remainderRow) != Math.abs(remainder));
        }
        return this.update.locationDelete.row.length != 0;
    }
    this.getVsSolider = function () {
        return this.isTurnBright ? this.darkSolider : this.brightSolider;
    }
    this.getVsKing = function () {
        return this.isTurnBright ? this.darkKing : this.brightKing;
    }
    this.getMySolider = function () {
        return this.isTurnBright ? this.brightSolider : this.darkSolider;
    }
    this.getMyKing = function () {
        return this.isTurnBright ? this.brightKing : this.darkKing;
    }
    this.isVsPlayer = function (row, column) {
        return (this.table[row][column] == this.getVsSolider() ||
            this.table[row][column] == this.getVsKing());
    }
    this.isMyPlayer = function (row, column) {
        return (this.table[row][column] == this.getMySolider() ||
            this.table[row][column] == this.getMyKing());
    }
    this.isSomeoneCanEat = function () {
        let countSoliders = 0;
        for (let row = 0; row < this.table.length; row++) {
            for (let column = 0; column < this.table[row].length; column++) {
                if (this.table[row][column] == this.getMySolider()) {
                    countSoliders++;
                    if (this.isCanEat({
                            row: row,
                            column: column
                        })) {
                        return true;
                    }
                } else if (this.table[row][column] == this.getMyKing()) {
                    countSoliders++;
                    if (this.isCanEatKing({
                            row: row,
                            column: column
                        })) {
                        return true;
                    }
                }
            }
        }
        if (countSoliders == 0)
            alert("Game Over! the winner is: " + (this.isTurnBright ? "Dark player" : "Bright player"));
        return false;
    }
    this.isCanEat = function (from) {
        for (let row = -2; row <= 4; row += 4) {
            for (let column = -2; column <= 4; column += 4) {
                if (this.table[from.row + row] != undefined && this.table[from.row + row][from.column + column] != undefined) {
                    if (this.isMove(from, {
                            row: (from.row + row),
                            column: (from.column + column)
                        }))
                        return true;
                }
            }
        }
        return false;
    }
    this.isCanEatKing = function (from) {
        let up = 1;
        for (let ways = 0; ways < 2; ways++) {
            up *= -1;
            let stopForward = false;
            let stopBack = false;
            let columnForward = from.column;
            let columnBack = from.column;
            for (let row = from.row + up; row < this.table.length && (!stopBack || !stopForward) && row >= 0; row += up) {
                if (!stopForward) {
                    columnForward++
                    if (this.table[row] != undefined && this.table[row][columnForward] != undefined) {
                        if (this.isMyPlayer(row, columnForward)) {
                            stopForward = true;
                        } else if (this.table[row][columnForward] != this.empty &&
                            this.table[row + up] != undefined && this.table[row + up][columnForward + 1] != undefined) {
                            if (this.isMoveKing(from, {
                                    row: (row + up),
                                    column: (columnForward + 1)
                                }))
                                return true;
                        }
                    }
                }
                if (!stopBack) {
                    columnBack--;
                    if (this.table[row] != undefined && this.table[row][columnBack] != undefined) {
                        if (this.isMyPlayer(row, columnBack)) {
                            stopBack = true;
                        } else if (this.table[row][columnBack] != this.empty &&
                            this.table[row + up] != undefined && this.table[row + up][columnBack - 1] != undefined) {
                            if (this.isMoveKing(from, {
                                    row: (row + up),
                                    column: (columnBack - 1)
                                }))
                                return true;
                        }
                    }
                }
            }
        }
        return false;
    }
    this.isCharacterPosition = function (locationRow, locationColumn) {
        if (this.table[locationRow][locationColumn] != this.empty)
            return true;
        return false;
    }
    this.move = function (element, targetLocation) {
        if (this.setInitLocations(targetLocation)) {
            if (this.locations.length == 1)
                this.setElements(element);
        }
        let target = returnRowAndColumn(targetLocation);
        let canEat = this.isSomeoneCanEat();
        this.update.locationDelete = {
            row: [],
            column: []
        };
        if (this.locations.length > 0) {
            if (this.isLegalMove(targetLocation)) {
                let from = returnRowAndColumn(this.locations[this.locations.length - 1]);
                if ((this.table[from.row][from.column] > 2 ? true : (canEat == Math.abs(target.row - from.row) != 1)) && canEat == (this.update.locationDelete.row.length != 0)) {
                    this.setElements(element);
                    this.locations.push(targetLocation);
                    if (this.update.locationDelete.row.length != 0) {
                        this.deleteCharacters();
                    }
                    if ((target.row == 0 && this.table[from.row][from.column] == this.brightSolider) ||
                        (target.row == this.table.length - 1 && this.table[from.row][from.column] == this.darkSolider)) {
                        this.table[target.row][target.column] = this.getMyKing();
                    } else
                        this.table[target.row][target.column] = this.table[from.row][from.column];
                    this.table[from.row][from.column] = this.empty;
                }
            }
        }
        if (this.locations.length > 1) {
            let from = returnRowAndColumn(this.locations[this.locations.length - 1]);
            if ((this.table[from.row][from.column] > 2 ? !this.isCanEatKing(from) : !this.isCanEat(from)) || canEat == false) {
                if (this.isGameOver()) {
                    alert("Game Over! the winner is: " + (this.isTurnBright ? "Bright player" : "Dark player"));
                }
                this.locations = [];
                this.isTurnBright = (this.isTurnBright ? false : true);
            }
            console.log(this.locations);
        }
    }
    this.isGameOver = function () {
        if (this.isHasSoliderVsPlayer() && this.isSomeoneCanMoveInVsPlayer())
            return false;
        return true;
    }
    this.isHasSoliderVsPlayer = function () {
        for (let row = 0; row < this.table.length; row++) {
            for (let column = 0; column < this.table[row].length; column++) {
                if (this.isVsPlayer(row, column))
                    return true;
            }
        }
    }
    this.isSomeoneCanMoveInVsPlayer = function () {
        this.isTurnBright = !this.isTurnBright;
        for (let row = 0; row < this.table.length; row++) {
            for (let column = 0; column < this.table[row].length; column++) {
                if (this.isMyPlayer(row, column)) {
                    if (this.isCanEat({
                            row: row,
                            column: column
                        })) {
                        this.isTurnBright = !this.isTurnBright;
                        return true;
                    } else {
                        for (let remainderRow = -1; remainderRow <= 1; remainderRow += 2) {
                            for (let remainderColumn = -1; remainderColumn <= 1; remainderColumn += 2) {
                                if (this.table[remainderRow + row] != undefined && this.table[remainderRow + row][remainderColumn + column] != undefined) {
                                    let from = {
                                        row: row,
                                        column: column
                                    }
                                    let target = {
                                        row: (row + remainderRow),
                                        column: (column + remainderColumn)
                                    }
                                    if (this.isLegalMoveFromToTarget(from, target)) {
                                        this.isTurnBright = !this.isTurnBright;
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.isTurnBright = !this.isTurnBright;
        return false;
    }
    this.deleteCharacters = function () {
        for (let index = 0; index < this.update.locationDelete.row.length; index++) {
            this.table[this.update.locationDelete.row[index]][this.update.locationDelete.column[index]] = this.empty;
        }
    }

    function returnRowAndColumn(locationConvert) {
        let halfLocation = locationConvert.indexOf("/");
        let row = Number(locationConvert.substring(0, halfLocation));
        let column = Number(locationConvert.substring(halfLocation + 1));
        return {
            row,
            column
        };
    }
}

checkersGameUI.prototype = {
    id: 0
}

function checkersGameUI(numbersOfRow) {
    var game = new CheckersGame(numbersOfRow);
    game.id = checkersGameUI.prototype.id;
    checkersGameUI.prototype.id += 1;
    game.createTable();
    console.log(game.table);
    const divCheckers = document.createElement("div");
    divCheckers.setAttribute("id", "divCheckers" + game.id);
    document.body.appendChild(divCheckers);
    game.render = function () {
        let table = document.getElementById("checker" + game.id);
        if (table != null)
            table.remove();
        table = document.createElement("table");
        table.setAttribute("id", "checker" + game.id);
        document.getElementById("divCheckers" + game.id).appendChild(table);
        for (let rows = 0; rows < game.table.length; rows++) {
            var row = document.createElement("tr");
            table.appendChild(row);
            for (let columns = 0; columns < game.table[rows].length; columns++) {
                let column = document.createElement("td");
                row.appendChild(column);
                if (rows % 2 == 0)
                    column.className = columns % 2 == 0 ? "bright" : "dark";
                else
                    column.className = columns % 2 == 1 ? "bright" : "dark";
                column.setAttribute("name", rows + "/" + columns);
                column.addEventListener("click", () => {
                    game.move(column, column.getAttribute("name"));
                    game.render();
                    if (game.elements.length == 1) {
                        document.querySelector("#" + table.getAttribute("id") + " td[name='" + game.elements[0].getAttribute("name") + "']").className = game.elements[0].className;
                    } else if (game.elements.length > 1) {
                        document.querySelector("#" + table.getAttribute("id") + " td[name='" + game.elements[0].getAttribute("name") + "']").className = game.elements[0].className;
                        document.querySelector("#" + table.getAttribute("id") + " td[name='" + game.elements[1].getAttribute("name") + "']").className = game.elements[1].className;
                    }
                });
                if (game.table[rows][columns] == 2) {
                    let bright = document.createElement("div");
                    column.appendChild(bright);
                    bright.className = "brightCharacter";
                } else if (game.table[rows][columns] == 1) {
                    let dark = document.createElement("div");
                    column.appendChild(dark);
                    dark.className = "darkCharacter";
                } else if (game.table[rows][columns] == 3) {
                    let darkKing = document.createElement("div");
                    column.appendChild(darkKing);
                    darkKing.className = "darkKing";
                } else if (game.table[rows][columns] == 4) {
                    let brightKing = document.createElement("div");
                    column.appendChild(brightKing);
                    brightKing.className = "brightKing";
                }
            }
        }
    }
    game.render();
}