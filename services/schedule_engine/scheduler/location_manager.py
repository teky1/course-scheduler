class LocationDistance:
    def __init__(self, loc1: str, loc2: str,
                 walk_time: float, bike_time: float):
        self.loc1 = loc1
        self.loc2 = loc2
        self.walk_time = walk_time
        self.bike_time = bike_time


# Placeholder class that returns 5 min times between all classes
class LocationManager:

    def __init__(self):
        self.all_distance = 5

    def distance(self, loc1: str, loc2: str) -> LocationDistance:
        return LocationDistance(loc1, loc2, self.all_distance, self.all_distance)
