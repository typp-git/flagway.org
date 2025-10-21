import { MdClose } from "react-icons/md";
import Image from "next/image"

/**
 * 
 * @param role: "players" | "coaches" | "chaperones"
 * @param columnFormat: columnDescriptor
 */
export function createTableRow(
  role: "team" | "players" | "coaches" | "chaperones",
  columnFormat: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id: string, name: string }[] }[],
  rowIndex: number,
  handleChange: (
    section: "team" | "players" | "coaches" | "chaperones",
    rowIndex: number,
    singleFieldMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id:string,name:string}[]  },
    value: string | File | boolean | number | null
  ) => void,
  rowData: Record<string, string | number | boolean | File | null | undefined>,
  errors: Record<string, string>
){
  return (
    <tr key={rowIndex}>
      <td className="p-2 border text-center">{rowIndex + 1}</td>
      {columnFormat.map((singleFieldMeta, colIndex) => {
        const value = rowData[singleFieldMeta.field_name];
        const error = errors[`${role}-${rowIndex}-${singleFieldMeta.field_name}`];
        return ( 
          <td key={colIndex} className="p-2 border">
            {singleFieldMeta.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={value === true || value === "true"}
                onChange={(e) =>
                  handleChange(role, rowIndex, singleFieldMeta, e.target.checked)
                }
                className="w-5 h-5"
                title={error || ""}
              />
            ) : singleFieldMeta.type === "select" ? (
              <select
                value={typeof value === "string" || typeof value === "number" ? value : ""}
                onChange={(e) =>
                  handleChange(role, rowIndex, singleFieldMeta, e.target.value)
                }
                className={`w-full p-2 border rounded-lg ${
                  error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                }`}
                title={error || ""}
              >
                <option value="">Select...</option>
                  {(singleFieldMeta.options ?? []).map((opt) => {
                    if (typeof opt === 'string') {
                      // option is a simple string
                      return (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      );
                    } else if (opt && typeof opt === 'object' && 'id' in opt && 'name' in opt) {
                      // option is an object with id and name
                      return (
                        <option key={opt.id} value={opt.id}>
                          {opt.name}
                        </option>
                      );
                    } else {
                      // fallback if shape unexpected
                      return null;
                    }
                  })}
              </select>
            ) : singleFieldMeta.type === "image" ? (
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-1 items-center">
                    <label title="Upload Image" className="text-xs bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleChange(role, rowIndex, singleFieldMeta, file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <button className=" text-black hover:text-red-500 cursor-pointer" title="Remove Image"
                      onClick={(e) => {e.preventDefault(); handleChange(role, rowIndex, singleFieldMeta, null)}}
                    >
                      <MdClose className="w-4 h-4"/>
                    </button>
                  </div>
                {(() => {
                  const preview =
                    value instanceof File ? URL.createObjectURL(value) :
                    typeof value === "string" ? value : "";
                    
                  return preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : null;
                })()}
              </div>
            ) : singleFieldMeta.type === "number" ? (
              <input
                type="number"
                value={typeof value === "string" || typeof value === "number" ? value : ""}
                onChange={e =>
                  handleChange(
                    role,
                    rowIndex,
                    singleFieldMeta, 
                    isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
                  )
                }
                className={`w-full p-2 border rounded-lg ${error ? "border-red-500 bg-red-100/50" : "border-gray-300"}`}
                title={error || ""}
              />
            ) : (
              <input
                type="text"
                value={typeof value === "string" || typeof value === "number" ? value : ""}
                onChange={(e) =>
                  handleChange(role, rowIndex, singleFieldMeta, e.target.value)
                }
                className={`w-full p-2 border rounded-lg ${
                  error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                }`}
                title={error || ""}
              />
            )}
          </td>
        );
      })}
    </tr>
  )
}

/**
 * 
 * @param role: "players" | "coaches" | "chaperones"
 * @param columnFormat: columnDescriptor
 */
export function createExpandedFormSection(
  role: "team" | "players" | "coaches" | "chaperones",
  columnFormat: { field_name: string; label: string; type: string; required?: boolean; options?: string[] | {id:string,name:string}[] }[],
  rowIndex: number,
  handleChange: (
    section: "team" | "players" | "coaches" | "chaperones",
    rowIndex: number,
    singleFieldMeta: { field_name: string; label: string; type: string; required?: boolean; options?: string[]|{id:string,name:string}[] },
    value: string | File | boolean | number | null
  ) => void,
  rowData: Record<string, string | number | boolean | File | null | undefined>,
  errors: Record<string, string>
) {
  return (
    <div key={rowIndex} className="border border-gray-300 p-4 rounded-lg mb-4">
      <div className="grid grid-cols-3 gap-4">
        {columnFormat.map((singleFieldMeta, colIndex) => {
          const value = rowData[singleFieldMeta.field_name];
          const error = errors[`${role}-${rowIndex}-${singleFieldMeta.field_name}`];

          return (
            <div key={colIndex}>
              <label className="block font-bold text-black mb-1">
                {singleFieldMeta.label}
              </label>

              {singleFieldMeta.type === "checkbox" ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value === true || value === "true"}
                    onChange={(e) =>
                      handleChange(role, rowIndex, singleFieldMeta, e.target.checked)
                    }
                    className="w-5 h-5"
                    title={error || ""}
                  />
                  <span className="text-sm text-gray-700">{singleFieldMeta.label}</span>
                </div>
              ) : singleFieldMeta.type === "select" ? (
                <select
                  value={
                    typeof value === "string" || typeof value === "number"
                      ? value
                      : ""
                  }
                  onChange={(e) =>
                    handleChange(role, rowIndex, singleFieldMeta, e.target.value)
                  }
                  className={`w-full p-2 border rounded-lg ${
                    error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                  }`}
                  title={error || ""}
                >
                  <option value="">Select...</option>
                    {(singleFieldMeta.options ?? []).map((opt) => {
                      if (typeof opt === 'string') {
                        // option is a simple string
                        return (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        );
                      } else if (opt && typeof opt === 'object' && 'id' in opt && 'name' in opt) {
                        // option is an object with id and name
                        return (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        );
                      } else {
                        // fallback if shape unexpected
                        return null;
                      }
                    })}
                </select>
              ) : singleFieldMeta.type === "image" ? (
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex flex-row gap-1 items-center">
                    <label title="Upload Image" className="text-xs bg-blue-100 hover:bg-blue-300 px-2 py-1 rounded cursor-pointer">
                      Upload
                      <input
                        type="file"
                        accept="image/*" // TODO: Only Static Images
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleChange(role, rowIndex, singleFieldMeta, file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                    <button className=" text-black hover:text-red-500 cursor-pointer" title="Remove Image"
                      onClick={(e) => {e.preventDefault(); handleChange(role, rowIndex, singleFieldMeta, null)}}
                    >
                      <MdClose className="w-4 h-4"/>
                    </button>
                  </div>
                  {(() => {
                    const preview =
                      value instanceof File
                        ? URL.createObjectURL(value)
                        : typeof value === "string"
                        ? value
                        : "";

                    return preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded border border-gray-300 shadow"
                      />
                    ) : null;
                  })()}
                </div>
              ) : singleFieldMeta.type === "number" ? (
                <input
                  type="number"
                  value={typeof value === "string" || typeof value === "number" ? value : ""}
                  onChange={e =>
                    handleChange(
                      role,
                      rowIndex,
                      singleFieldMeta, 
                      isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber
                    )
                  }
                  className={`w-full p-2 border rounded-lg ${error ? "border-red-500 bg-red-100/50" : "border-gray-300"}`}
                  title={error || ""}
                />
              ) : (
                <input
                  type="text"
                  value={typeof value === "string" || typeof value === "number" ? value : ""}
                  onChange={(e) =>
                    handleChange(role, rowIndex, singleFieldMeta, e.target.value)
                  }
                  className={`w-full p-2 border rounded-lg ${
                    error ? "border-red-500 bg-red-100/50" : "border-gray-300"
                  }`}
                  title={error || ""}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
