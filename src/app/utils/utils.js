import { Link } from "react-router-dom";
import React from "react";

export const LinkTemplate = (name, id, type, isPage = false) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className={isPage ? "info-section-page__link" : "info-section__link"}
    >
      {name}
    </Link>
  );
};

export const HeaderLinkTemplate = (id, name, type, isPage = false) => {
  return (
    <Link
      to={name === "unknown" ? "" : "/" + type + "/" + id}
      className="info-section__link"
    >
      <h2
        className={isPage ? "info-section-page__title" : "info-section__title"}
      >
        {name}
      </h2>
    </Link>
  );
};

export const getIdFromURL = (url) => {
  return url.split("/").slice(-1)[0];
};

export const getItems = async (id, url) => {
  return fetch(`https://rickandmortyapi.com/api/${url}/${id}`).then(
    (response) => {
      if (response.status === 200) return response.json();
      if (response.status === 404)
        throw new Error("There's no data for your query :(");
      else throw new Error("Something went wrong :(");
    }
  );
};

export const filters = {
  character: {
    status: ["alive", "dead", "unknown"],
    gender: ["male", "female", "genderless", "unknown"],
    species: [
      "alien",
      "animal",
      "cronenberg",
      "disease",
      "human",
      "humanoid",
      "mythological creature",
      "poopybutthole",
      "robot",
      "unknown",
    ],
    type: [
      "alligator-person",
      "alphabetrian",
      "amoeba-person",
      "animal",
      "anime",
      "artificial intelligence",
      "bepisian",
      "bird-person",
      "bird-person human mix",
      "blue ape alien",
      "cat",
      "cat controlled dead lady",
      "cat-person",
      "caterpillar",
      "centaur",
      "chair",
      "changeformer",
      "chud",
      "chud human mix",
      "clay-person",
      "clone",
      "cone-nippled alien",
      "conjoined twin",
      "cookie",
      "dummy",
      "eat shiter-person",
      "eel",
      "elephant-person",
      "ferkusian",
      "ferret robot",
      "fish-person",
      "flansian",
      "floop floopian",
      "fly",
      "game",
      "garblovian",
      "gazorpian",
      "gazorpian reproduction robot",
      "gear-person",
      "genetic experiment",
      "hivemind",
      "hole",
      "hologram",
      "human gazorpian",
      "human with a flower in his head",
      "human with antennae",
      "human with ants in his eyes",
      "human with baby legs",
      "human with giant head",
      "human with tusks",
      "human-snake hybrid",
      "interdimensional gaseous being",
      "jellybean",
      "korblock",
      "mexican",
      "microverse inhabitant",
      "miniverse inhabitant",
      "monogatron",
      "monster",
      "morglutzian",
      "morty's toxic side",
      "mytholog",
      "planet",
      "plutonian",
      "pripudlian",
      "rat",
      "rick's toxic side",
      "ring-nippled alien",
      "robot",
      "robot-crocodile hybrid",
      "scarecrow",
      "scrotian",
      "self-aware arm",
      "sentient ant colony",
      "tentacle alien",
      "the devil",
      "tiger",
      "time god",
      "tinymouth",
      "toy",
      "traflorkian",
      "trunk-person",
      "tumblorkian",
      "turkey",
      "turkey human mix",
      "tuskfish",
      "unknown-nippled alien",
      "vampire",
      "wasp",
      "weasel",
      "whenwolf",
      "zeus",
      "zigerion",
      "zombodian",
    ],
  },
  location: {
    type: [
      "acid plant",
      "arcade",
      "artificially generated world",
      "asteroid",
      "base",
      "box",
      "cluster",
      "consciousness",
      "convention",
      "country",
      "customs",
      "daycare",
      "death star",
      "diegesis",
      "dimension",
      "dream",
      "dwarf planet (celestial dwarf)",
      "elemental rings",
      "fantasy town",
      "game",
      "hell",
      "human",
      "liquid",
      "machine",
      "memory",
      "menagerie",
      "microverse",
      "miniverse",
      "mount",
      "nightmare",
      "non-diegetic alternative reality",
      "planet",
      "police department",
      "quadrant",
      "quasar",
      "reality",
      "resort",
      "spa",
      "space",
      "space station",
      "spacecraft",
      "teenyverse",
      "tv",
      "woods",
      "unknown",
    ],
    dimension: [
      "chair dimension",
      "cromulon dimension",
      "cronenberg dimension",
      "dimension 5-126",
      "dimension c-137",
      "dimension c-35",
      "dimension c-500a",
      "dimension d-99",
      "dimension d716",
      "dimension d716-b",
      "dimension d716-c",
      "dimension j-22",
      "dimension j19ζ7",
      "dimension k-22",
      "dimension k-83",
      "eric stoltz mask dimension",
      "evil rick's target dimension",
      "fantasy dimension",
      "fascist dimension",
      "fascist shrimp dimension",
      "fascist teddy bear dimension",
      "giant telepathic spiders dimension",
      "magic dimension",
      "merged dimension",
      "phone dimension",
      "pizza dimension",
      "post-apocalyptic dimension",
      "replacement dimension",
      "testicle monster dimension",
      "tusk dimension",
      "unknown dimension",
      "wasp dimension",
      "unknown",
    ],
  },
  episode: {},
};
