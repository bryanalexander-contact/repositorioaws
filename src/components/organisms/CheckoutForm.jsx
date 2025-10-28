import Button from "../atoms/Button";
import FormGroup from "../molecules/FormGroup";

export default function CheckoutForm({ datos, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-4">
      <FormGroup label="Nombre" name="nombre" value={datos.nombre} onChange={onChange} />
      <FormGroup label="Correo" type="email" name="correo" value={datos.correo} onChange={onChange} />
      <FormGroup label="Dirección" name="direccion" value={datos.direccion} onChange={onChange} />
      <Button type="submit" variant="primary" className="w-full">Finalizar compra</Button>
    </form>
  );
}
