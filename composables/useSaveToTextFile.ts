import { SimulationResults } from '@/store/simulation/types'
import FileSaver from 'file-saver';

export const useSaveToTextFile = (simulationResults: SimulationResults) => {
  try {
    // save to text file
    let results = "FULL ASSIOCIATIVE MAPPING (LRU) SIMULATION\n\n";
    // cache hits
    results = results + `Cache Hits: ${simulationResults.cacheHits}` + "\n";
    // cache miss
    results = results + `Cache Miss: ${simulationResults.cacheMiss}` + "\n";
    // miss penalty
    results = results + `Miss Penalty: ${simulationResults.missPenalty}` + "\n";
    // average memory access time
    results = results + `Average Memory Access Time: ${simulationResults.avgAccessTime}` + "\n";
    // total memory access time
    results = results + `Total Memory Access Time: ${simulationResults.totalAccessTime}` + "\n\n";
    // snapshot of cache memory
    results = results + " Block\t\t| Data\n";
    for(let ind in simulationResults.cache.blocksValue) {
      results = results + ` ${ind}` + "\t\t\t| " + simulationResults.cache.blocksValue[ind] + "\n";
    }

    // create blob for the result string text
    const blob = new Blob([results], {type: "text/plain;charset=utf-8"});
    // save file
    FileSaver(blob, "fam-lru-results.txt");

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
