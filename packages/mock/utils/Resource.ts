import { RequestInterceptor, ServerRequest, ServerResponse } from '@cosey/request-interceptor';
import { Result } from './Result';
import type { Collection, Table } from 'dexie';
import { paginate } from './paginate';
import { difference } from 'lodash-es';
import { validateIngeter } from '../validator/common';
import { order } from './order';

export type ResourceAction = 'list' | 'create' | 'details' | 'update' | 'delete';

const allActions: ResourceAction[] = ['list', 'create', 'details', 'update', 'delete'];

export interface ResourceConfig {
  list?: {
    constrain?: (req: ServerRequest, tableOrColl: Table | Collection) => Collection | Table;
    after?: (rows: any[], req: ServerRequest) => any;
  };
  details?: {
    after?: (row: any) => any;
  };
  create?: {
    before?: (body: any, req: ServerRequest) => any;
    after?: (id: number, body: any) => any;
  };
  update?: {
    validate?: (req: ServerRequest, res: ServerResponse) => any;
    before?: (body: any, req: ServerRequest) => any;
    after?: (id: number, body: any) => any;
  };
  delete?: {
    validate?: (req: ServerRequest, res: ServerResponse) => any;
    before?: (body: any, req: ServerRequest) => any;
    after?: (id: number) => any;
  };
}

export class Resource {
  /**
   * 带分页的列表
   */
  static async list(
    req: ServerRequest,
    res: ServerResponse,
    table: Table,
    config?: ResourceConfig['list'],
  ) {
    let tableOrColl = order(req, table);

    if (Object.keys(req.params).length > 0) {
      tableOrColl = tableOrColl.filter((row) => {
        return Object.keys(req.params).every((key) => {
          const value = req.params[key];
          return row[key] == value;
        });
      });
    }

    tableOrColl = config?.constrain?.(req, tableOrColl) || tableOrColl;

    const data = await paginate(req, tableOrColl, config?.after);

    res.json(Result.success(data));
  }

  /**
   * 详情
   */
  static async details(
    req: ServerRequest,
    res: ServerResponse,
    table: Table,
    config?: ResourceConfig['details'],
  ) {
    const id = Number(req.params.id);
    if (!validateIngeter(id)) {
      return res.json(Result.error(400, validateIngeter));
    }

    let row = await table.get(id);
    if (!row) {
      return res.json(Result.error(404));
    }
    row = config?.after?.(row) || row;
    res.json(Result.success(row));
  }

  /**
   * 新增
   */
  static async create(
    req: ServerRequest,
    res: ServerResponse,
    table: Table,
    config?: ResourceConfig['create'],
  ) {
    const body = config?.before?.(req.body, req) || req.body;
    const key = await table.add({
      ...body,
      ...req.params,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await config?.after?.(key, req.body);

    res.json(Result.success(key));
  }

  /**
   * 修改
   */
  static async update(
    req: ServerRequest,
    res: ServerResponse,
    table: Table,
    config?: ResourceConfig['update'],
  ) {
    const id = Number(req.params.id);
    if (!validateIngeter(id)) {
      return res.json(Result.error(400, validateIngeter));
    }

    const validateResult = await config?.validate?.(req, res);
    if (validateResult) {
      return validateResult;
    }

    const row = await table.get(id);
    if (!row) {
      return res.json(Result.error(400));
    }

    const body = config?.before?.(req.body, req) || req.body;
    await table.update(id, { ...body, updatedAt: new Date() });

    await config?.after?.(id, req.body);

    res.json(Result.success());
  }

  /**
   * 删除
   */
  static async delete(
    req: ServerRequest,
    res: ServerResponse,
    table: Table,
    config?: ResourceConfig['delete'],
  ) {
    const id = Number(req.params.id);
    if (!validateIngeter(id)) {
      return res.json(Result.error(400, validateIngeter));
    }

    const row = await table.get(id);
    if (!row) {
      return res.json(Result.error(404));
    }

    await table.delete(id);

    await config?.after?.(id);

    res.json(Result.success());
  }

  path = '';

  table: Table;

  config: ResourceConfig;

  constructor(path: string, table: Table, config?: ResourceConfig) {
    this.path = path;
    this.table = table;
    this.config = config || {};
  }

  actions: ResourceAction[] = allActions;

  only(actions: ResourceAction[]) {
    this.actions = actions;
    return this;
  }

  except(actions: ResourceAction[]) {
    this.actions = difference(allActions, actions);
    return this;
  }

  intercept(interceptor: RequestInterceptor) {
    this.actions.forEach((action) => {
      switch (action) {
        case 'list':
          interceptor.get(this.path, async ({ req, res }) => {
            return Resource.list(req, res, this.table, this.config.list);
          });
          break;
        case 'details':
          interceptor.get(`${this.path}/:id`, async ({ req, res }) => {
            return Resource.details(req, res, this.table);
          });
          break;
        case 'create':
          interceptor.post(this.path, async ({ req, res }) => {
            return Resource.create(req, res, this.table, this.config.create);
          });
          break;
        case 'update':
          interceptor.patch(`${this.path}/:id`, async ({ req, res }) => {
            return Resource.update(req, res, this.table, this.config.update);
          });
          break;
        case 'delete':
          interceptor.delete(`${this.path}/:id`, async ({ req, res }) => {
            return Resource.delete(req, res, this.table, this.config.delete);
          });
          break;
      }
    });
  }
}
