import InventoryEntryForm from "@/features/inventory-entries/components/inventory-entry-form";

export default function InventoryEntryCreate() {
  return (
    <>
      <hgroup className="flex justify-between">
        <h1 className="text-4xl font-sans-accent mb-6">Nuevo Ingreso</h1>
      </hgroup>

      <InventoryEntryForm />
    </>
  );
}
