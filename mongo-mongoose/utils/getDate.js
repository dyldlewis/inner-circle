export default function getDate() {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const day = currentDate.getDate().toString();
  const dateString = `${month} ${day}`;
  console.log(dateString)

  return dateString
}
