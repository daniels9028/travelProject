const FooterList = ({
  items,
}: {
  items: { title: string; lists: string[] };
}) => {
  console.log(items);
  return (
    <div className="flex flex-col gap-8">
      <p className="text-white font-medium text-[18px]">{items.title}</p>
      <ul className="flex flex-col gap-4 text-[#8E8E8E] text-[16px] cursor-pointer">
        {items.lists.map((list, index) => (
          <li className="hover:underline duration-150" key={index}>
            {list}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
