export class WorkBook {
  name: string;
  sheets: WorkSheet[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addSheet(sheet: WorkSheet) {
    if (!this.sheets.includes(sheet)) {
      this.sheets.push(sheet);
    }
  }

  removeSheet(sheet: WorkSheet) {
    if (this.sheets.includes(sheet)) {
      this.sheets.splice(this.sheets.indexOf(sheet), 1);
    }
  }
}

export class WorkSheet {
  name: string;

  sheet: Cell[][] = [];

  headRowCount = 0;

  constructor(name: string) {
    this.name = name;
  }

  setCell(cIndex: number, rIndex: number, cell: Cell) {
    const row = (this.sheet[rIndex] ??= []);
    row[cIndex] = cell;
  }

  insertColumn(index: number, count = 1) {
    this.sheet.forEach((row) => {
      for (let i = 0; i < count; i++) {
        row.splice(index + i, 0, new Cell());
      }
    });
  }

  deleteColumn(startIndex: number, count: number) {
    this.sheet.forEach((row) => {
      row.splice(startIndex, count);
    });
  }

  insertRow(index: number, count = 1) {
    for (let i = 0; i < count; i++) {
      this.sheet.splice(index + i, 0, []);
    }
  }

  deleteRow(startIndex: number, count: number) {
    this.sheet.splice(startIndex, count);
  }
}

export class Cell {
  value?: any;
  style: Record<string, any> = {};

  rowSpan = 1;
  colSpan = 1;

  colIndex = -1;
  rowIndex = -1;

  isHeader = false;

  children?: Cell[];

  isEmpty = false;

  constructor(value?: any) {
    this.value = value;
  }
}
