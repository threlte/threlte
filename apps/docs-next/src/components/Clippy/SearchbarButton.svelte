<button
  class="w-full relative flex items-center hover:brightness-125"
  on:click
>
  <input
    class="w-full bg-blue-800/90  text-sm px-10 py-1 outline-none outline-blue-500"
    placeholder="Search docs"
    disabled
  />
  <button
    class={`absolute left-0 ml-2 flex gap-2 duration-200 hover:bg-blue-300/20 px-1 py-1 rounded-md 
    `}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      aria-labelledby="title"
      aria-describedby="desc"
      class="w-6"
      role="img"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>Search</title>
      <desc>A line styled icon from Orion Icon Library.</desc>
      <path
        data-name="layer2"
        fill="none"
        stroke="#ffffff"
        stroke-miterlimit="10"
        stroke-width="2"
        d="M39.049 39.049L56 56"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
      <circle
        data-name="layer1"
        cx="27"
        cy="27"
        r="17"
        fill="none"
        stroke="#ffffff"
        stroke-miterlimit="10"
        stroke-width="2"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg></button
  >
</button>
