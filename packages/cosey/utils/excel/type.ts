import { type TableColumnProps } from '../../components/table/table-column/table-column';

export type ExportBookType = 'csv' | 'txt' | 'xml' | 'html' | 'xlsx';

export interface ExportBookFormat {
  type: ExportBookType;
  ext: string;
  sheets: 'multi' | 'single';
  label: string;
  mime: string;
}

export interface ExportExcelWorkSheet {
  name: string;
  columns: TableColumnProps[];
  noGroup?: boolean;
  noHead?: boolean;
  transform?: (row: any, column: TableColumnProps, cellValue: any, index: number) => any;
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
