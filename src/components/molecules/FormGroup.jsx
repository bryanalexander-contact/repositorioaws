import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Select from "../atoms/Select";

export default function FormGroup({ label, type = "text", name, value, onChange, options, placeholder }) {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      {type === "select" ? (
        <Select name={name} value={value} onChange={onChange} options={options} placeholder={placeholder} />
      ) : (
        <Input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  );
}
