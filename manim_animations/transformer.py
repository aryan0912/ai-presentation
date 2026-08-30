from manim import *

class PositionalEncodingScene(Scene):
    def construct(self):
        title = Text("Positional Encoding", font_size=36, color=BLUE_D).to_edge(UP)
        self.play(Write(title))
        
        formula1 = MathTex(r"PE_{(pos, 2i)} = \sin(pos / 10000^{2i/d_{model}})")
        formula2 = MathTex(r"PE_{(pos, 2i+1)} = \cos(pos / 10000^{2i/d_{model}})")
        
        group = VGroup(formula1, formula2).arrange(DOWN, buff=0.5).shift(UP * 1)
        self.play(Write(group))
        self.wait(2)
        
        # Visualize addition
        word_emb = Matrix([["w_1"], ["w_2"], ["\dots"], ["w_d"]]).scale(0.7)
        plus = MathTex("+")
        pos_emb = Matrix([["\sin(\dots)"], ["\cos(\dots)"], ["\dots"], ["\cos(\dots)"]]).scale(0.7)
        equals = MathTex("=")
        final_emb = Matrix([["w_1 + \sin(\dots)"], ["w_2 + \cos(\dots)"], ["\dots"], ["w_d + \cos(\dots)"]]).scale(0.7)
        
        eq_group = VGroup(word_emb, plus, pos_emb, equals, final_emb).arrange(RIGHT, buff=0.5).shift(DOWN * 1.5)
        
        self.play(FadeIn(word_emb))
        self.play(Write(plus), FadeIn(pos_emb))
        self.wait(1)
        self.play(Write(equals), TransformFromCopy(VGroup(word_emb, pos_emb), final_emb))
        self.wait(3)

class ScaledDotProductScene(Scene):
    def construct(self):
        title = Text("Scaled Dot-Product Attention", font_size=36, color=PURPLE_D).to_edge(UP)
        self.play(Write(title))
        
        # Q, K, V
        q = Text("Q", color=RED_D).shift(LEFT * 4 + UP * 2)
        k = Text("K", color=YELLOW_D).shift(UP * 2)
        v = Text("V", color=TEAL_D).shift(RIGHT * 4 + UP * 2)
        self.play(FadeIn(q), FadeIn(k), FadeIn(v))
        
        # Math
        formula = MathTex(r"\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V")
        self.play(Write(formula))
        self.wait(2)
        
        # Step by step
        step1 = MathTex(r"1.\ \text{MatMul: } Q \cdot K^T").shift(DOWN * 1)
        step2 = MathTex(r"2.\ \text{Scale: } / \sqrt{d_k}").shift(DOWN * 1.7)
        step3 = MathTex(r"3.\ \text{Mask (Opt)}").shift(DOWN * 2.4)
        step4 = MathTex(r"4.\ \text{Softmax}").shift(DOWN * 3.1)
        step5 = MathTex(r"5.\ \text{MatMul with } V").shift(DOWN * 3.8)
        
        steps = VGroup(step1, step2, step3, step4, step5)
        for step in steps:
            self.play(Write(step))
            self.wait(0.5)
        self.wait(2)

class MultiHeadScene(Scene):
    def construct(self):
        title = Text("Multi-Head Attention", font_size=36, color=ORANGE).to_edge(UP)
        self.play(Write(title))
        
        v = Text("V", color=TEAL_D).shift(LEFT * 3 + UP * 1)
        k = Text("K", color=YELLOW_D).shift(UP * 1)
        q = Text("Q", color=RED_D).shift(RIGHT * 3 + UP * 1)
        self.play(FadeIn(v), FadeIn(k), FadeIn(q))
        
        # Linear Projections
        linears = VGroup(*[Text("Linear", font_size=20).shift(LEFT * 3 + DOWN * i) for i in range(1, 4)])
        self.play(FadeIn(linears))
        
        # Scaled Dot-Product Attention heads
        heads = VGroup(*[Rectangle(width=2, height=0.5, color=PURPLE).shift(DOWN * i) for i in range(1, 4)])
        head_labels = VGroup(*[Text(f"Head {i}", font_size=20).move_to(heads[i-1]) for i in range(1, 4)])
        
        for i in range(3):
            self.play(Create(heads[i]), Write(head_labels[i]), run_time=0.5)
        self.wait(1)
        
        concat = Text("Concat", font_size=24).shift(DOWN * 4)
        self.play(FadeIn(concat))
        self.wait(1)
        
        linear_final = Text("Linear", font_size=24).shift(DOWN * 5)
        self.play(FadeIn(linear_final))
        self.wait(2)

class FullArchitectureScene(Scene):
    def construct(self):
        title = Text("The Transformer Architecture", font_size=36).to_edge(UP)
        self.play(Write(title))
        
        encoder_bg = Rectangle(width=3, height=5, color=GRAY, fill_opacity=0.2).shift(LEFT * 2.5 + DOWN * 0.5)
        encoder_label = Text("Encoder", font_size=24).next_to(encoder_bg, UP)
        
        decoder_bg = Rectangle(width=3, height=6, color=GRAY, fill_opacity=0.2).shift(RIGHT * 2.5 + DOWN * 0)
        decoder_label = Text("Decoder", font_size=24).next_to(decoder_bg, UP)
        
        self.play(Create(encoder_bg), Write(encoder_label), Create(decoder_bg), Write(decoder_label))
        
        # Flow arrow from encoder to decoder
        arrow = Arrow(start=encoder_bg.get_right(), end=decoder_bg.get_left(), color=BLUE)
        self.play(GrowArrow(arrow))
        
        # Labels inside
        enc_mha = Text("Multi-Head\nAttention", font_size=16, color=ORANGE).move_to(encoder_bg).shift(DOWN * 1)
        enc_ffn = Text("Feed\nForward", font_size=16, color=BLUE).move_to(encoder_bg).shift(UP * 1)
        self.play(Write(enc_mha), Write(enc_ffn))
        
        dec_mha1 = Text("Masked MHA", font_size=16, color=RED).move_to(decoder_bg).shift(DOWN * 2)
        dec_mha2 = Text("Multi-Head\nAttention", font_size=16, color=ORANGE).move_to(decoder_bg)
        dec_ffn = Text("Feed\nForward", font_size=16, color=BLUE).move_to(decoder_bg).shift(UP * 2)
        
        self.play(Write(dec_mha1), Write(dec_mha2), Write(dec_ffn))
        self.wait(3)
