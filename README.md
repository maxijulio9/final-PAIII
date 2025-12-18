Examen Programación Avanzada 3
18-12-2025

Enunciado
APP “Gastos Personales” (MiBilletera)
Crear una app móvil con Ionic/Angular para registrar gastos. Cada gasto tiene una categoría y se debe colorear según esa categoría.

Requisitos funcionales
1) Pantallas mínimas (3)
•	Home: lista de gastos
•	Nuevo gasto: formulario
•	Detalle/Editar: ver y editar gasto
2) ÚNICA interface: Expense
export interface Expense {
  id: number;
  concepto: string;
  categoria: 'comida' | 'transporte' | 'salud' | 'ocio'; 
  monto: number;
  fecha: string; 
  pagado: boolean;
}
3) Coloreado obligatorio (por categoría)
•	comida → rojo
•	transporte → naranja
•	salud → verde
•	ocio → azul
(Se puede hacer con ion-badge, ion-chip o clase CSS dinámica)
4) Backend con json-server
npx json-server --watch db.json --port 3000

Funcionalidades requeridas
•	Listar gastos en Home mostrando: concepto, monto, fecha y  categoría coloreada
•	Crear gasto con Reactive Forms (validar: concepto, monto, fecha)
•	Editar gasto (PUT)
•	Eliminar con confirmación (AlertController)
•	Ordenar por fecha (más reciente primero)

Ejemplo db.json (5 gastos)
{
  "expenses": [
    { "id": 1, "concepto": "Supermercado", "categoria": "comida", "monto": 18500, "fecha": "2025-12-05", "pagado": true },
    { "id": 2, "concepto": "SUBE", "categoria": "transporte", "monto": 2500, "fecha": "2025-12-06", "pagado": true },
    { "id": 3, "concepto": "Farmacia", "categoria": "salud", "monto": 7300, "fecha": "2025-12-08", "pagado": false },
    { "id": 4, "concepto": "Cine", "categoria": "ocio", "monto": 9000, "fecha": "2025-12-10", "pagado": true },
    { "id": 5, "concepto": "Almuerzo", "categoria": "comida", "monto": 6200, "fecha": "2025-12-18", "pagado": false }
  ]
}

