<script lang="ts">
  import { page } from "$app/state";
  import Icon from "$lib/ui/comps/Icon.svelte";

  interface Props {
    data: RecipeCardData;
  }

  let { data }: Props = $props();

  data = {
    cover_image: {
      alt: "Tradisionele Skaappotjie",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLeR76aw0vXwqWhXXyJ201BvaLLFQUifJl94rqgN8J710peSnm5qdpEHtnwquSelHlfNGD1ViyeNNCZJNuBMAR8z755tidOj6DhJonbTCzrn6FZs8s1TOc8IjANCa-l1qFu32RenVc0H3SfzAEGPqz_nzsY_GVJtjE1_qhZ25QW2UgHVX9YM357J5wFV61u4gi8s4ZZX_PMUMckmRdIgd-ehex3XQ9js3461IjSknroNYA5et6TM",
    },
  };
</script>

<!-- Card 1 -->
<article
  class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300"
>
  <div class="h-56 relative overflow-hidden bg-surface-container-low flex items-center justify-center">
    {#if data.cover_image}
      <img
        alt={data.cover_image.alt}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        src={data.cover_image.src}
      />

      <button
        hidden={!page.data.is_logged_in}
        class="absolute top-4 right-4 bg-surface-container-lowest/90 p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors backdrop-blur-lg shadow-sm"
      >
        <Icon name="edit" class="text-white" />
      </button>
    {/if}
  </div>
  <div class="p-6 grow flex flex-col justify-between">
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Aandete</span
        >
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Warm</span
        >
      </div>
      <h2 class="font-headline-md text-headline-md text-on-background mb-4">Tradisionele Skaappotjie</h2>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span> 2.5 uur</span
        >
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="restaurant">restaurant</span> Maklik</span
        >
      </div>
      <div class="flex gap-4 text-outline font-label-sm text-[13px]">
        <span>Werk: 30 min</span>
        <span>Wag: 120 min</span>
      </div>
    </div>
  </div>
</article>
<!-- Card 2 -->
<article
  class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300"
>
  <div class="h-56 relative overflow-hidden bg-surface-container-low flex items-center justify-center">
    <img
      alt="Die Perfekte Braai"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHxa9cnFjn5IJwyFEYMHlCjXDP_k1wBNloyjJJ2-K1W8u_rEF3F76knpeNLeBUgjoNI4oocfv7mp2Ezn9l4urftoKpNUElk6s0YGIXZ_l8d7jR6LCz9ZT3kh1DG2fvZOVxigDWgjeUGhYGh7DkCjJ2J7RkGnFSqWQ2n8AfIT6cehxIlspze83UuhtNOSDe-5tH-xNMVhxEjru3gapMW4HDLWoBLIASRzet1ppqrcS-YqSqlyRZn60"
    />
    <button
      class="absolute top-4 right-4 bg-surface-container-lowest/90 p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors backdrop-blur-sm shadow-sm"
    >
      <span class="material-symbols-outlined text-[20px]" data-icon="bookmark_border">bookmark_border</span>
    </button>
  </div>
  <div class="p-6 grow flex flex-col justify-between">
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Aandete</span
        >
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Bykos</span
        >
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Eenvoudig</span
        >
      </div>
      <h2 class="font-headline-md text-headline-md text-on-background mb-4">Die Perfekte Braai</h2>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span> 45 min</span
        >
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="restaurant">restaurant</span> Medium</span
        >
      </div>
      <div class="flex gap-4 text-outline font-label-sm text-[13px]">
        <span>Werk: 20 min</span>
        <span>Wag: 25 min</span>
      </div>
    </div>
  </div>
</article>
<!-- Card 3 -->
<article
  class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300"
>
  <div class="h-56 relative overflow-hidden bg-surface-container-low flex items-center justify-center">
    <img
      alt="Ouma se Melktert"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmqVeRaPkiwIeU0Ox-fa5bfgAtG7NWRIti2Ve18ZrRWrBT6Y26WNZNVKPjd6xhG8IJNpaC_o4WMGOUSENlCwyKnHs-1qYYYCHPW9JLxL92TtnxCQd4mnFQpbxg0GxVzBngH-2DKUXyYVcFh6qKJIj-a72A0r-a4StCKVt9Dc6gMbGi1BcNwpnPaEOsvlcpxq_2h32ItyrkbQa-cdg8Q2te_s70O_Bibd4cQctm-9ScNNJXTpLegtQ"
    />
    <button
      class="absolute top-4 right-4 bg-surface-container-lowest/90 p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors backdrop-blur-sm shadow-sm"
    >
      <span class="material-symbols-outlined text-[20px]" data-icon="bookmark_border">bookmark_border</span>
    </button>
  </div>
  <div class="p-6 grow flex flex-col justify-between">
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Oondgebak</span
        >
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Eenvoudig</span
        >
      </div>
      <h2 class="font-headline-md text-headline-md text-on-background mb-4">Ouma se Melktert</h2>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span> 1 uur</span
        >
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="restaurant">restaurant</span> Maklik</span
        >
      </div>
      <div class="flex gap-4 text-outline font-label-sm text-[13px]">
        <span>Werk: 15 min</span>
        <span>Wag: 45 min</span>
      </div>
    </div>
  </div>
</article>
<!-- Card 4 -->
<article
  class="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col relative group hover:shadow-md hover:shadow-secondary/5 transition-shadow duration-300"
>
  <div class="h-56 relative overflow-hidden bg-surface-container-low flex items-center justify-center">
    <img
      alt="Warm Malvapoeding"
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAh2UA09B5iTF43FXMTmIRsF9FCXuF3JRJkhd9FqHi-DZhZBrJE4fJYGl8IDgJdDd1o39sUYxBph70YqHiGsvSEYNwrRMIsVElVV0qGyV5nfrICRChWRqXdeGcCxIUQFzCcOl7cE6lbTOwQn-KBGcgUV83i-KmhOYEndAuvogOP7GOeYNYkxXqC4RulrsJhPMal4UvYO3f58k4KeV-ZiUxXwZCNklYneBtriX85cEkc-U84-Et23A"
    />
    <button
      class="absolute top-4 right-4 bg-surface-container-lowest/90 p-2 rounded-xl text-on-surface-variant hover:text-primary transition-colors backdrop-blur-sm shadow-sm"
    >
      <span class="material-symbols-outlined text-[20px]" data-icon="bookmark_border">bookmark_border</span>
    </button>
  </div>
  <div class="p-6 grow flex flex-col justify-between">
    <div>
      <div class="flex flex-wrap gap-2 mb-4">
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Oondgebak</span
        >
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-[12px] px-3 py-1 rounded-full"
          >Warm</span
        >
      </div>
      <h2 class="font-headline-md text-headline-md text-on-background mb-4">Warm Malvapoeding</h2>
    </div>
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-6 text-on-surface-variant font-label-sm text-label-sm">
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="schedule">schedule</span> 50 min</span
        >
        <span class="flex items-center gap-1.5"
          ><span class="material-symbols-outlined text-[18px]" data-icon="restaurant">restaurant</span> Maklik</span
        >
      </div>
      <div class="flex gap-4 text-outline font-label-sm text-[13px]">
        <span>Werk: 10 min</span>
        <span>Wag: 40 min</span>
      </div>
    </div>
  </div>
</article>
