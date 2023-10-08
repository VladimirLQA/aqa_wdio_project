import Ajv, {JSONSchemaType} from "ajv";

interface ValidateSchemaProps<T> {
  schema: JSONSchemaType<T>;
  json: T | T[];
}

export async function validateSchema<T>({schema, json}: ValidateSchemaProps<T>): Promise<boolean> {
  const ajv = new Ajv({
    allErrors: true,
    verbose: false
  });

  const validate = ajv.compile(schema);
  const valid = validate(json);
  if (!valid) {
    throw Error(`Schema validation error: ${JSON.stringify({
      validationErrors: validate.errors
    }, null, 2)}`);
  }
  return valid;
}

