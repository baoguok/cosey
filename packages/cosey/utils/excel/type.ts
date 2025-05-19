export type ExportBookType = 'csv' | 'txt' | 'xml' | 'html' | 'xlsx';

export interface ExportBookFormat {
  type: ExportBookType;
  ext: string;
  sheets: 'multi' | 'single';
  label: string;
  mime: string;
}

export interface ExportExcelColumn {
  label: string;
  prop: string;
  width?: number;
  columns?: ExportExcelColumn[];
  [k: string]: any;
}

export interface ExportExcelWorkSheet {
  name: string;
  columns: ExportExcelColumn[];
  noGroup?: boolean;
  noHead?: boolean;
  transform?: (value: any, column: ExportExcelColumn) => any;
}

export interface ExportExcelScheme {
  filename: string;
  bookType?: ExportBookType;
  worksheet?: ExportExcelWorkSheet;
  worksheets?: ExportExcelWorkSheet[];
}

export interface CellAddress {
  c: number;
  r: number;
}

export interface Range {
  s: {
    c: number;
    r: number;
  };
  e: {
    c: number;
    r: number;
  };
}
