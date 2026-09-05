from manim import *
import numpy as np

class VectorSpaceSuperpositionScene(Scene):
    def construct(self):
        # Title
        title = Text("The Capacity of High-Dimensional Space", color=BLUE_D).scale(0.8)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait()

        # Quiz 1
        q1 = Text("Quiz 1: How many mutually perpendicular\nvectors fit in a 3D space?", font_size=32).shift(UP*1)
        self.play(FadeIn(q1))
        self.wait(2)
        
        # 3D axes representation (2D projection for simplicity)
        axes = Axes(
            x_range=[-2, 2, 1],
            y_range=[-2, 2, 1],
            x_length=3,
            y_length=3,
            axis_config={"color": GREY}
        ).shift(DOWN*1.5 + LEFT*3)
        
        v1 = Arrow(axes.c2p(0,0), axes.c2p(1,0), color=RED, buff=0)
        v2 = Arrow(axes.c2p(0,0), axes.c2p(0,1), color=GREEN, buff=0)
        v3 = Arrow(axes.c2p(0,0), axes.c2p(-0.7,-0.7), color=BLUE, buff=0) # pseudo-z axis
        
        self.play(Create(axes))
        self.play(GrowArrow(v1))
        self.play(GrowArrow(v2))
        self.play(GrowArrow(v3))
        
        a1 = Text("Answer: Exactly 3", color=YELLOW, font_size=32).next_to(q1, DOWN)
        self.play(Write(a1))
        self.wait(2)

        # Quiz 2
        q2 = Text("Quiz 2: What if we allow vectors to be\n'almost' perpendicular (88° - 92°)?", font_size=32).shift(UP*1 + RIGHT*3)
        self.play(FadeIn(q2))
        self.wait(2)

        a2 = Text("Answer: Exponentially Many!", color=YELLOW, font_size=32).next_to(q2, DOWN)
        self.play(Write(a2))
        
        # Visualizing a cluster of almost orthogonal vectors
        vectors = VGroup()
        for i in range(20):
            angle = np.random.uniform(0, 2*PI)
            radius = np.random.uniform(0.8, 1.2)
            color = interpolate_color(RED_D, TEAL_D, alpha=np.random.rand())
            vec = Arrow(axes.c2p(0,0), axes.c2p(radius*np.cos(angle), radius*np.sin(angle)), color=color, buff=0, stroke_width=2)
            vectors.add(vec)
            
        axes2 = axes.copy().shift(RIGHT*6)
        vectors.move_to(axes2.get_center())
        # Re-center vectors properly inside axes2
        vectors = VGroup(*[
            Arrow(axes2.c2p(0,0), axes2.c2p(np.random.uniform(0.8, 1.2)*np.cos(a), np.random.uniform(0.8, 1.2)*np.sin(a)), 
                  color=interpolate_color(RED_D, TEAL_D, alpha=np.random.rand()), buff=0, stroke_width=2)
            for a in np.linspace(0, 2*PI, 30)
        ])
        
        self.play(Create(axes2))
        self.play(AnimationGroup(*[GrowArrow(v) for v in vectors], lag_ratio=0.1))
        self.wait(2)

        # Conclusion
        conclusion = Text("In a 12,288-dimensional space (GPT-3),\nyou can store millions of concepts in superposition.", font_size=28, color=TEAL_D)
        conclusion.to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(3)


class FluffyBlueCreatureAttentionScene(Scene):
    def construct(self):
        # Sentence
        sentence = Text("A fluffy blue creature roamed the forest.", font_size=36)
        sentence.to_edge(UP)
        self.play(Write(sentence))
        self.wait()

        # The Noun (Query)
        noun_highlight = SurroundingRectangle(sentence[12:20], color=RED, buff=0.1) # 'creature'
        noun_label = Text("Query: 'Are there adjectives in front of me?'", font_size=24, color=RED).next_to(noun_highlight, DOWN)
        self.play(Create(noun_highlight))
        self.play(Write(noun_label))
        self.wait(2)

        # The Adjectives (Keys)
        adj1_highlight = SurroundingRectangle(sentence[2:8], color=YELLOW, buff=0.1) # 'fluffy'
        adj2_highlight = SurroundingRectangle(sentence[9:13], color=YELLOW, buff=0.1) # 'blue'
        
        adj_label = Text("Keys: 'We are adjectives!'", font_size=24, color=YELLOW).next_to(sentence[2:13], DOWN, buff=1.5)
        self.play(Create(adj1_highlight), Create(adj2_highlight))
        self.play(Write(adj_label))
        self.wait(2)

        # The Values (Payload)
        v1_arrow = Arrow(adj1_highlight.get_bottom(), noun_highlight.get_bottom(), color=TEAL_D, path_arc=1.5)
        v2_arrow = Arrow(adj2_highlight.get_bottom(), noun_highlight.get_bottom(), color=TEAL_D, path_arc=1.5)
        
        value_label = Text("Values: Transferring meaning...", font_size=24, color=TEAL_D).next_to(v1_arrow, DOWN)
        
        self.play(GrowArrow(v1_arrow), GrowArrow(v2_arrow))
        self.play(Write(value_label))
        self.wait(2)

        # Updated meaning
        updated_noun = Text("creature (+ fluffy, blue)", font_size=36, color=TEAL_D).move_to(sentence[12:20])
        self.play(
            FadeOut(sentence[12:20]),
            FadeIn(updated_noun)
        )
        self.wait(3)

class AttentionVsMLPScene(Scene):
    def construct(self):
        title = Text("The Division of Labor in a Transformer", color=BLUE_D).scale(0.8)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait()

        # Attention Block
        att_box = Rectangle(width=4, height=3, color=RED_D, fill_opacity=0.1).shift(LEFT*3)
        att_title = Text("Attention Blocks", font_size=32, color=RED_D).next_to(att_box, UP)
        att_desc = Text("Routes Context\n(Moving 'fluffy' to 'creature')", font_size=24).move_to(att_box)
        
        # MLP Block
        mlp_box = Rectangle(width=4, height=3, color=TEAL_D, fill_opacity=0.1).shift(RIGHT*3)
        mlp_title = Text("MLP Blocks", font_size=32, color=TEAL_D).next_to(mlp_box, UP)
        mlp_desc = Text("Stores Facts\n(Michael Jordan -> Basketball)", font_size=24).move_to(mlp_box)

        self.play(Create(att_box), Write(att_title))
        self.play(Write(att_desc))
        self.wait(2)

        self.play(Create(mlp_box), Write(mlp_title))
        self.play(Write(mlp_desc))
        self.wait(2)

        # Cycle arrow
        arrow1 = Arrow(att_box.get_right(), mlp_box.get_left(), color=WHITE)
        arrow2 = Arrow(mlp_box.get_bottom(), att_box.get_bottom(), color=WHITE, path_arc=-1.5)
        cycle_text = Text("Repeated 96x in GPT-3", font_size=24, color=YELLOW).next_to(arrow2, DOWN)

        self.play(GrowArrow(arrow1))
        self.play(GrowArrow(arrow2))
        self.play(Write(cycle_text))
        self.wait(3)
