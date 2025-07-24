import { formatAsDate, formatAsDateTime, toArray, Scope, isEmpty, isString } from '../../../utils';
import { ElMessage, ElSwitch, ElTag, SwitchProps, type TableColumnCtx } from 'element-plus';
import { get } from 'lodash-es';
import { type TableColumnProps } from './table-column';
import { type LongTextProps, LongText } from '../../long-text';
import { type MediaCardProps, MediaCard } from '../../media-card';
import { type MediaCardGroupProps, MediaCardGroup } from '../../media-card-group';
import { ref } from 'vue';
import { type Translator } from '../../../hooks';

interface RendererOptions {
  cellValue: any;
  row: any;
  column: TableColumnCtx<any>;
  index: number;
}

export type RendererType =
  | 'text'
  | 'date'
  | 'datetime'
  | 'media'
  | {
      type: 'media';
      props?: MediaCardProps;
    }
  | 'mediagroup'
  | {
      type: 'mediagroup';
      props?: MediaCardGroupProps;
    }
  | 'tag'
  | {
      type: 'tag';
      path?: string | string[];
      props?: LongTextProps;
    }
  | 'longtext'
  | {
      type: 'longtext';
      props?: LongTextProps;
    }
  | 'switch'
  | {
      type: 'switch';
      props?: Partial<SwitchProps>;
      api?: (value: any, row: any) => Promise<any>;
    };

type GetObjectRendererType<T extends RendererType> = T extends object
  ? T
  : { type: T } extends RendererType
    ? RendererType extends { type: T }
      ? RendererType
      : never
    : {
        type: T;
      };

export const mapRendererColumnProps: Record<string, TableColumnProps> = {
  media: {
    minWidth: 104,
    className: 'is-media',
  },
  mediagroup: {
    minWidth: 104,
    className: 'is-media',
  },
  tag: {
    className: 'is-tag',
  },
};

/**
 * 可组合其他组件进行渲染
 */
export function renderer<T extends RendererType>(
  { cellValue, row }: RendererOptions,
  type: RendererType = 'text',
  t: Translator,
) {
  if (isEmpty(cellValue)) {
    return '';
  }

  const obj = (isString(type) ? { type } : type) as GetObjectRendererType<T>;

  switch (obj.type) {
    case 'text':
      return cellValue;
    case 'datetime':
      return formatAsDateTime(cellValue);
    case 'date':
      return formatAsDate(cellValue);
    case 'media':
      return cellValue ? <MediaCard src={cellValue} {...obj.props} /> : '';
    case 'mediagroup':
      return cellValue ? <MediaCardGroup srcset={cellValue} {...obj.props} /> : '';
    case 'tag': {
      const value = isEmpty(cellValue) ? [] : toArray(cellValue);

      return (
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}
        >
          {value.map((item: any) => (
            <ElTag type="primary" size="small" {...obj.props}>
              {obj.path ? get(item, obj.path) : item}
            </ElTag>
          ))}
        </div>
      );
    }
    case 'longtext':
      return <LongText text={cellValue} {...obj.props} />;
    case 'switch': {
      const loading = ref(false);
      const value = ref(cellValue);

      return (
        <Scope>
          <ElSwitch
            {...obj.props}
            model-value={value.value}
            loading={loading.value}
            validateEvent={false}
            onChange={async (val) => {
              loading.value = true;

              try {
                await obj.api?.(val, row);
                value.value = val;
                ElMessage.success(t('co.common.editSuccess'));
              } catch {
                void 0;
              } finally {
                loading.value = false;
              }
            }}
          />
        </Scope>
      );
    }
  }
}

/**
 * 导出表格数据时使用的渲染器，只需要获取文本数据
 */
export function exportRenderer<T extends RendererType>(
  row: any,
  column: TableColumnProps,
  cellValue: any,
  index: number,
) {
  if (column.formatter) {
    return column.formatter(row, column as TableColumnCtx<any>, cellValue, index);
  }

  if (column.format) {
    return column.format(cellValue, row, column as TableColumnCtx<any>, index);
  }

  if (isEmpty(cellValue)) {
    return '';
  }

  const type = column.renderer || 'text';

  const obj = (isString(type) ? { type } : type) as GetObjectRendererType<T>;

  switch (obj.type) {
    case 'text':
    case 'media':
    case 'longtext':
    case 'switch':
      return cellValue;
    case 'mediagroup':
      return JSON.stringify(cellValue);
    case 'datetime':
      return formatAsDateTime(cellValue);
    case 'date':
      return formatAsDate(cellValue);
    case 'tag': {
      const value = isEmpty(cellValue) ? [] : toArray(cellValue);

      return value.map((item: any) => (obj.path ? get(item, obj.path) : item)).join(', ');
    }
  }
}
