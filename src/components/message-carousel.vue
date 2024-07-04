<script setup lang="ts">
import { ref } from "vue";
import messageCard from "./message-card.vue";
import type { CardMessage, CarouselMessage } from "../models/messages";

const props = defineProps<{
  carousel: CarouselMessage;
}>();

const cards = ref<CardMessage[]>(props.carousel!.cards);
const cardsRefs = ref<HTMLDivElement[]>([]);
const carouselRef = ref<HTMLDivElement | null>(null);
const innerRef = ref<HTMLDivElement | null>(null);
const carouselStyles = ref({});
const innerStyles = ref({});
const transitioning = ref<boolean>(false);
const transition = "transform 0.2s";

function freezeCarouselWidth(): void {
  const carouselWidth = carouselRef.value?.offsetWidth;
  carouselStyles.value = {
    overflow: "hidden",
    "max-width": `${carouselWidth!}px`,
  };
}

function getTotalInnerWidth(): number {
  return cardsRefs.value.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.offsetWidth;
  }, 0);
}

function next(): void {
  if (transitioning.value) return;
  transitioning.value = true;

  freezeCarouselWidth();

  const totalInnerWidth = getTotalInnerWidth();

  const firstcard = cards.value[0];
  cards.value.push(firstcard);

  const firstCardRef = cardsRefs.value[0];

  innerStyles.value = {
    transition: transition,
    transform: `translateX(-${firstCardRef.offsetWidth}px)`,
    width: `${totalInnerWidth + firstCardRef.offsetWidth + 1}px`,
  };

  afterTransition(() => {
    cards.value.shift();
    resetTranslate();
    transitioning.value = false;
  });
}

function prev(): void {
  if (transitioning.value) return;
  transitioning.value = true;

  freezeCarouselWidth();

  const totalInnerWidth = getTotalInnerWidth();

  const lastCard = cards.value[cards.value.length - 1];
  cards.value.unshift(lastCard);

  const lastCardRef = cardsRefs.value[cardsRefs.value.length - 1];

  innerStyles.value = {
    transition: "none",
    transform: `translateX(-${lastCardRef.offsetWidth}px)`,
    width: `${totalInnerWidth + lastCardRef.offsetWidth + 1}px`,
  };

  setTimeout(() => {
    innerStyles.value = {
      transition: transition,
      transform: `translateX(0)`,
      width: `${totalInnerWidth + lastCardRef.offsetWidth + 1}px`,
    };

    afterTransition(() => {
      cards.value.pop();
      resetTranslate();
      transitioning.value = false;
    });
  });
}

function afterTransition(callback: () => void): void {
  const listener = () => {
    callback();
    innerRef.value?.removeEventListener("transitionend", listener);
  };
  innerRef.value?.addEventListener("transitionend", listener);
}

function resetTranslate(): void {
  carouselStyles.value = {};
  innerStyles.value = {
    transition: "none",
    transform: `translateX(0)`,
  };
}
</script>

<template>
  <div class="tvk-carousel" ref="carouselRef" :style="carouselStyles">
    <div class="tvk-carousel-inner" ref="innerRef" :style="innerStyles">
      <div
        v-for="card in cards"
        class="tvk-carousel-card"
        :key="JSON.stringify(card)"
        ref="cardsRefs"
      >
        <messageCard :card="card"></messageCard>
      </div>
    </div>
  </div>

  <div class="tvk-carousel-controls">
    <button class="tvk-btn" @click="prev">prev</button>
    <button class="tvk-btn" @click="next">next</button>
  </div>
</template>
