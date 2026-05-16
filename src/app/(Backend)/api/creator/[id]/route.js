export async function PATCH(request, { params }) {
  const { id } = params;
  const { status } = await request.json();
  const collection = await getCreatorRequests();
  
  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return NextResponse.json({ success: true, message: "Status updated" });
}

export async function DELETE(_, { params }) {
  const { id } = params;
  const collection = await getCreatorRequests();
  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true, message: "Request deleted" });
}