/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { ItemController } from './controllers/ItemController';
import { TagController } from './controllers/TagController';
import { UserController } from './controllers/UserController';

const models: TsoaRoute.Models = {
  "ITag": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "name": { "dataType": "string", "required": true },
    },
  },
  "IItem": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "type": { "dataType": "string", "required": true },
      "title": { "dataType": "string", "required": true },
      "description": { "dataType": "string", "required": true },
      "content": { "dataType": "string", "required": true },
      "created": { "dataType": "datetime", "required": true },
      "modified": { "dataType": "datetime" },
      "authorId": { "dataType": "double", "required": true },
      "authorName": { "dataType": "string", "required": true },
      "tags": { "dataType": "array", "array": { "ref": "ITag" }, "required": true },
    },
  },
  "IItemInsertRequest": {
    "properties": {
      "type": { "dataType": "string", "required": true },
      "title": { "dataType": "string", "required": true },
      "description": { "dataType": "string", "required": true },
      "content": { "dataType": "string", "required": true },
      "tags": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
    },
  },
  "IItemUpdateRequest": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "type": { "dataType": "string", "required": true },
      "title": { "dataType": "string", "required": true },
      "description": { "dataType": "string", "required": true },
      "content": { "dataType": "string", "required": true },
      "tags": { "dataType": "array", "array": { "dataType": "double" }, "required": true },
    },
  },
  "ITagInsertRequest": {
    "properties": {
      "name": { "dataType": "string", "required": true },
    },
  },
  "ITagUpdateRequest": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "name": { "dataType": "string", "required": true },
    },
  },
  "IUser": {
    "properties": {
      "id": { "dataType": "double", "required": true },
      "name": { "dataType": "string", "required": true },
      "email": { "dataType": "string", "required": true },
      "created": { "dataType": "datetime", "required": true },
    },
  },
  "IUserInsertRequest": {
    "properties": {
      "name": { "dataType": "string", "required": true },
      "email": { "dataType": "string", "required": true },
      "password": { "dataType": "string", "required": true },
    },
  },
};

export function RegisterRoutes(app: any) {
  app.get('/api/v1/items',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ItemController();


      const promise = controller.getAll.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/v1/items/:id',
    function(request: any, response: any, next: any) {
      const args = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ItemController();


      const promise = controller.get.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/v1/items',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "IItemInsertRequest" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ItemController();


      const promise = controller.insert.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/api/v1/items',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "IItemUpdateRequest" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ItemController();


      const promise = controller.put.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.delete('/api/v1/items/:id',
    function(request: any, response: any, next: any) {
      const args = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new ItemController();


      const promise = controller.delete.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/v1/tags',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new TagController();


      const promise = controller.getAll.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/v1/tags/:id',
    function(request: any, response: any, next: any) {
      const args = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new TagController();


      const promise = controller.get.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/v1/tags',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "ITagInsertRequest" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new TagController();


      const promise = controller.insert.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.put('/api/v1/tags',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "ITagUpdateRequest" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new TagController();


      const promise = controller.put.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.delete('/api/v1/tags/:id',
    function(request: any, response: any, next: any) {
      const args = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new TagController();


      const promise = controller.delete.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/v1/users',
    function(request: any, response: any, next: any) {
      const args = {
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();


      const promise = controller.getAll.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.get('/api/v1/users/:id',
    function(request: any, response: any, next: any) {
      const args = {
        id: { "in": "path", "name": "id", "required": true, "dataType": "double" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();


      const promise = controller.get.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });
  app.post('/api/v1/users',
    function(request: any, response: any, next: any) {
      const args = {
        request: { "in": "body", "name": "request", "required": true, "ref": "IUserInsertRequest" },
      };

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request);
      } catch (err) {
        return next(err);
      }

      const controller = new UserController();


      const promise = controller.insert.apply(controller, validatedArgs);
      promiseHandler(controller, promise, response, next);
    });


  function isController(object: any): object is Controller {
    return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode;
        if (isController(controllerObj)) {
          const headers = controllerObj.getHeaders();
          Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
          });

          statusCode = controllerObj.getStatus();
        }

        if (data || data === false) { // === false allows boolean result
          response.status(statusCode || 200).json(data);
        } else {
          response.status(statusCode || 204).end();
        }
      })
      .catch((error: any) => next(error));
  }

  function getValidatedArgs(args: any, request: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case 'request':
          return request;
        case 'query':
          return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
        case 'path':
          return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
        case 'header':
          return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
        case 'body':
          return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
        case 'body-prop':
          return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
      }
    });
    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, '');
    }
    return values;
  }
}
