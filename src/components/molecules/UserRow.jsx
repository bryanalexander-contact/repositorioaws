import Button from "../atoms/Button";

export default function UserRow({ usuario, onEdit, onDelete }) {
  return (
    <tr>
      <td>{usuario.run}</td>
      <td>{usuario.nombre} {usuario.apellidos}</td>
      <td>{usuario.correo}</td>
      <td>{usuario.tipoUsuario}</td>
      <td>{usuario.region}</td>
      <td>{usuario.comuna}</td>
      <td>
        <Button variant="secondary" onClick={() => onEdit(usuario)}>Editar</Button>
        <Button variant="danger" onClick={() => onDelete(usuario.run)}>Eliminar</Button>
      </td>
    </tr>
  );
}
