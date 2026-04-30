# IMPORTS
import pygame
import math

# CLASSES
class Point:
    def __init__(self, x, y, pinned = False):
        self.current_x = x
        self.current_y = y
        self.previous_x = x
        self.previous_y = y
        self.pinned = pinned
        self.dragging = False

    def update(self):
        if self.pinned:
            return

        # VERLET INTEGRATION OF MOVEMENT
        v_x = self.current_x - self.previous_x
        v_y = self.current_y - self.previous_y

        self.previous_x = self.current_x
        self.previous_y = self.current_y

        self.current_x += v_x * FRICTION
        self.current_y += (v_y * FRICTION) + GRAVITY

        # FLOOR COLLISION CHECK
        if self.current_y >= (HEIGHT - RADIUS):
            self.current_y = (HEIGHT - RADIUS)
            self.previous_y = self.current_y

        # OBSTACLE COLLISION CHECK
        dx = self.current_x - obstacle.x
        dy = self.current_y - obstacle.y
        distance = math.hypot(dx, dy)
        if distance < obstacle.r and distance > 0:
            nx = dx / distance  # normalized x
            ny = dy / distance  # normalized y
            self.current_x = obstacle.x + nx * obstacle.r
            self.current_y = obstacle.y + ny * obstacle.r
            self.previous_x = self.current_x
            self.previous_y = self.current_y

    def draw(self):
        pygame.draw.circle(SCREEN, (255, 255, 255), (int(self.current_x), int(self.current_y)), RADIUS)

class Stick:
    def __init__(self, point_1, point_2):
        self.point_1 = point_1
        self.point_2 = point_2
        self.length = math.dist((point_1.current_x, point_1.current_y),
                                (point_2.current_x, point_2.current_y))

    def update(self):
        dx = self.point_2.current_x - self.point_1.current_x
        dy = self.point_2.current_y - self.point_1.current_y

        distance = math.hypot(dx, dy)

        if distance == 0:
            return

        difference = (self.length - distance) / distance / 2 * STIFFNESS  # dividing by 2 maintains symmetry, each point gets half correction
        offset_x = dx * difference
        offset_y = dy * difference

        # POSITION-BASED ANALOG OF NEWTON'S THIRD LAW, ACTUALLY PULL THE POINTS BACK
        if not self.point_1.pinned:
            self.point_1.current_x -= offset_x
            self.point_1.current_y -= offset_y
        if not self.point_2.pinned:
            self.point_2.current_x += offset_x
            self.point_2.current_y += offset_y

    def draw(self):
        pygame.draw.line(SCREEN, (200, 200, 255), (int(self.point_1.current_x), int(self.point_1.current_y)), (int(self.point_2.current_x), int(self.point_2.current_y)))

class Circle:
    def __init__(self, x, y, r):
        self.x = x
        self.y = y
        self.r = r
        self.dragging = False

    def draw(self):
        pygame.draw.circle(SCREEN, (60, 80, 60), (int(self.x), int(self.y)), self.r)
        pygame.draw.circle(SCREEN, (100, 160, 100), (int(self.x), int(self.y)), self.r, 2)

class Slider:
    def __init__(self, x, y, width, min_val, max_val, start, label):
        self.x = x
        self.y = y
        self.width = width
        self.min = min_val
        self.max = max_val
        self.value = start
        self.label = label
        self.dragging = False

    def knob(self):
        t = (self.value - self.min) / (self.max - self.min)
        return self.x + t * self.width  # slider pos

    def slide_on_event(self, event):
        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_x, mouse_y = pygame.mouse.get_pos()
            if abs(mouse_x - self.knob()) < 10 and abs(mouse_y - self.y) < 10:
                self.dragging = True
        if event.type == pygame.MOUSEBUTTONUP:
            self.dragging = False
        # BOUND THE SLIDER
        if self.dragging:
            mouse_x, mouse_y = pygame.mouse.get_pos()
            mouse_x = max(self.x, min(self.x + self.width, mouse_x))
            t = (mouse_x - self.x) / self.width
            self.value = self.min + t * (self.max - self.min)

    def draw(self):
        label_surface = FONT.render(f"{self.label}: {self.value: .3f}", True, (200, 200, 200))
        SCREEN.blit(label_surface, (self.x, self.y - 18))
        pygame.draw.line(SCREEN, (100, 100, 100), (self.x, self.y), (self.x + self.width, self.y), 3)
        pygame.draw.line(SCREEN, (120, 180, 255), (self.x, self.y), (int(self.knob()), self.y), 3)
        pygame.draw.circle(SCREEN, (255, 100, 100), (int(self.knob()), self.y), 8)

# GLOBALS (pls don't hate me whoever reads this)
pygame.init()
pygame.display.set_caption("Dynamics Sandbox")
WIDTH = 800
HEIGHT = 600
SCREEN = pygame.display.set_mode((WIDTH, HEIGHT))
CLOCK = pygame.time.Clock()
RADIUS = 3  # radius of points
FONT = pygame.font.SysFont("monospace", 13)

# SLIDERS
gravity_slider = Slider(20, 55, 160, 0, 2, 0.5, "Gravity")
friction_slider = Slider(20, 110, 160, 0.75, 1.0, 0.999, "Friction")
stiffness_slider = Slider(20, 165, 160, 0.1, 1.0, 1.0, "Stiffness")

# POINT, STICK, AND OBSTACLE GENERATION
columns = 20
rows = 15
spacing = 20

points = []
sticks = []

for y in range(rows):
    for x in range(columns):
        # pin every third point of the top row
        pinned = (y == 0 and x % 3 == 0)
        points.append(Point(200 + x * spacing, 50 + y * spacing, pinned))

def find_index(x, y):
    return x + y * columns

for y in range(rows):
    for x in range(columns):
        if x < columns - 1:
            sticks.append(Stick(points[find_index(x, y)], points[find_index(x + 1, y)]))  # SLIGHTLY TRICKY CODE HERE
        if y < rows - 1:
            sticks.append(Stick(points[find_index(x, y)], points[find_index(x, y + 1)]))

obstacle = Circle(400, 300, 50)

# RUN
running = True
while running:
    for event in pygame.event.get():
        # QUIT
        if event.type == pygame.QUIT:
            running = False
        # DRAG OBSTACLE
        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse_x, mouse_y = pygame.mouse.get_pos()
            # if the pressed down mouse and the object are in the same spot? we're dragging
            if math.dist((mouse_x, mouse_y), (obstacle.x, obstacle.y)) < obstacle.r:
                obstacle.dragging = True
            else:
                for p in points:
                    if math.dist((p.current_x, p.current_y), (mouse_x, mouse_y)) < 10:
                        p.dragging = True
                        break  # break required to ensure we only snatch one set of coordinates
        # RELEASE DRAG
        if event.type == pygame.MOUSEBUTTONUP:
            obstacle.dragging = False
            for p in points:
                p.dragging = False

        # READ SLIDER
        gravity_slider.slide_on_event(event)
        friction_slider.slide_on_event(event)
        stiffness_slider.slide_on_event(event)

    SCREEN.fill((20, 30, 30))

    GRAVITY = gravity_slider.value
    FRICTION = friction_slider.value
    STIFFNESS = stiffness_slider.value

    if obstacle.dragging:
        obstacle.x, obstacle.y = pygame.mouse.get_pos()

    for p in points:
        if p.dragging:
            p.current_x, p.current_y = pygame.mouse.get_pos()
        p.update()

    # sticks are updated multiple times per frame, lets the "mesh" feel like a mesh
    for i in range(5):
        for s in sticks:
            s.update()

    obstacle.draw()

    for s in sticks:
        s.draw()
    for p in points:
        p.draw()

    gravity_slider.draw()
    friction_slider.draw()
    stiffness_slider.draw()

    pygame.display.flip()
    CLOCK.tick(60)

pygame.quit()
