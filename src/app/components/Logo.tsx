import Image from 'next/image';

const Logo = () => {
  return (
    <div className=" ml-2 mt-1 items-center justify-start z-30">
      <Image
        src="/images/LOGO2.png"
        alt="Logo"
        width={300} 
        height={300}
        priority
      />
    </div>
  );
};

export default Logo;
